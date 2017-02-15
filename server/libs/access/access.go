package access

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/swampy821/pocketpenguin/server/types"
)

var jwtSecret = os.Getenv("JWT_SECRET")

const tokenExpire = 3600 * 72 //72 hours expiration

var clientToken string

type valid struct {
	Data accessValid `json:"data"`
}

type accessValid struct {
	IsValid bool   `json:"is_valid"`
	UserID  string `json:"user_id"`
}

func GetAppToken() {
	resp, _ := http.Get("https://graph.facebook.com/oauth/access_token?client_id=433048977029860&client_secret=" + os.Getenv("CLIENT_SECRET") + "&grant_type=client_credentials")
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	clientToken = strings.Split(string(body), "=")[1]
}

func IsValid(accessKey string) (bool, string, error) {
	url := "https://graph.facebook.com/debug_token?%20input_token=" + accessKey + "%20&access_token=" + clientToken
	resp, _ := http.Get(url)
	defer resp.Body.Close()
	decoder := json.NewDecoder(resp.Body)
	var valid valid
	err := decoder.Decode(&valid)
	return valid.Data.IsValid, valid.Data.UserID, err
}

func getTime() int32 {
	return int32(time.Now().Unix())
}

func createJWTToken(auth *types.AuthTypeNoAccess) error {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"ID":      auth.ID,
		"Email":   auth.Email,
		"Picture": auth.Picture,
		"Expires": getTime() + tokenExpire,
	})
	tokenString, err := token.SignedString([]byte(jwtSecret))
	auth.JWT = tokenString
	return err
}

func DecodeJWTToken(tokenString string) (types.AuthTypeNoAccess, error) {
	var auth types.AuthTypeNoAccess

	parsedToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(jwtSecret), nil
	})

	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		if int32(claims["Expires"].(float64)) < getTime() {
			return auth, errors.New("Token Expired")
		}
		auth.Email = claims["Email"].(string)
		auth.ID = claims["ID"].(string)
		auth.Picture = claims["Picture"].(string)
	}
	return auth, err
}

func GetJWTToken(auth *types.AuthTypeNoAccess) error {
	return createJWTToken(auth)
}

func Valid(r *http.Request) (types.AuthTypeNoAccess, bool) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return types.AuthTypeNoAccess{}, false
	}
	authHeaderParts := strings.Split(authHeader, " ")
	token := authHeaderParts[1]
	auth, err := DecodeJWTToken(token)
	if err != nil {
		log.Print(err)
		return types.AuthTypeNoAccess{}, false
	}
	return auth, true

}
