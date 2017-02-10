package stores

import (
	"github.com/swampy821/pcon-schedule/server/libs/access"
	"github.com/swampy821/pcon-schedule/server/types"
	"gopkg.in/mgo.v2/bson"
)

func AuthGet(ID string) (types.AuthTypeNoAccess, error) {
	collection := Session.DB("PP").C("auth")
	var result types.AuthTypeNoAccess
	err := collection.Find(bson.M{"id": ID}).One(&result)
	return result, err
}

func AuthSave(auth types.AuthType) (types.AuthTypeNoAccess, error) {
	collection := Session.DB("PP").C("auth")
	saveAuth := types.AuthTypeNoAccess{Email: auth.Email, ID: auth.ID, Picture: auth.Picture.Data.URL}
	err := collection.Insert(saveAuth)
	return saveAuth, err
}

func AuthValidJWT(JWT string) (types.AuthTypeNoAccess, error) {
	auth, err := access.DecodeJWTToken(JWT)
	if err == nil {
		return AuthGet(auth.ID)
	}
	return auth, err
}
