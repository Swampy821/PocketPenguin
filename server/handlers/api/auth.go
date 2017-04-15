package api

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pocketpenguin/server/libs/access"
	"github.com/swampy821/pocketpenguin/server/libs/stores"
	"github.com/swampy821/pocketpenguin/server/types"
)

func decodeRequest(r *http.Request) (types.AuthType, error) {
	decoder := json.NewDecoder(r.Body)
	var auth types.AuthType
	err := decoder.Decode(&auth)
	return auth, err
}

func handleAuth(auth types.AuthType) (types.AuthTypeNoAccess, error) {
	storedAuth, err := stores.AuthGet(auth.ID, "", "")
	if err != nil {
		storedAuth, err := stores.AuthSave(auth)
		return storedAuth, err
	}

	return storedAuth, nil
}

func Auth(w http.ResponseWriter, r *http.Request, rend render.Render) {
	auth, err := decodeRequest(r)
	authValid, userID, authErr := access.IsValid(auth.AccessToken)

	if err == nil && authErr == nil {
		//Verify everything is valid
		if authValid && userID == auth.ID {
			responseAuth, _ := handleAuth(auth)
			access.GetJWTToken(&responseAuth)

			rend.JSON(200, responseAuth)
		} else {
			rend.Error(401)
		}
	} else {
		rend.Error(500)
		log.Print("Error: " + err.Error())
	}
}

func decodeRegisterRequest(r *http.Request) (types.AuthType, error) {
	decoder := json.NewDecoder(r.Body)
	var auth types.AuthType
	err := decoder.Decode(&auth)
	return auth, err
}

func checkRequiredFields(auth types.AuthType) bool {
	if len(auth.Username) == 0 ||
		len(auth.Password) == 0 ||
		len(auth.Email) == 0 ||
		len(auth.Name) == 0 {
		return false
	}

	return true
}

func handleRegister(auth types.AuthType) (types.AuthTypeNoAccess, error) {
	var storedAuth types.AuthTypeNoAccess
	var err error

	if stores.UsernameTaken(auth.Username) != true {
		storedAuth, err = stores.AuthSave(auth)
	} else {
		err = errors.New("Username taken")
	}
	return storedAuth, err
}

func AuthRegister(w http.ResponseWriter, r *http.Request, rend render.Render) {

	var storedAuth types.AuthTypeNoAccess
	var err error
	auth, _ := decodeRegisterRequest(r)
	if checkRequiredFields(auth) {
		storedAuth, err = handleRegister(auth)
	} else {
		err = errors.New("Required fields are not filled in")
	}
	if err != nil {
		rend.JSON(400, types.ErrObj{Code: 400, Message: err.Error()})
	} else {
		access.GetJWTToken(&storedAuth)
		rend.JSON(200, storedAuth)
	}

}

func AuthLogin(w http.ResponseWriter, r *http.Request, rend render.Render) {
	auth, _ := decodeRegisterRequest(r)

	storedAuth, err := stores.AuthGet("", auth.Username, auth.Password)

	if err != nil {
		rend.JSON(400, types.ErrObj{Code: 400, Message: "Cannot find username or password"})
		return
	}
	access.GetJWTToken(&storedAuth)

	rend.JSON(200, storedAuth)
}
