package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pcon-schedule/server/libs/access"
	"github.com/swampy821/pcon-schedule/server/libs/stores"
	"github.com/swampy821/pcon-schedule/server/types"
)

func decodeRequest(r *http.Request) (types.AuthType, error) {
	decoder := json.NewDecoder(r.Body)
	var auth types.AuthType
	err := decoder.Decode(&auth)
	return auth, err
}

func handleAuth(auth types.AuthType) (types.AuthTypeNoAccess, error) {
	storedAuth, err := stores.AuthGet(auth.ID)
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
