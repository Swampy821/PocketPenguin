package stores

import (
	"log"

	"github.com/swampy821/pocketpenguin/server/libs/access"
	"github.com/swampy821/pocketpenguin/server/types"
	"gopkg.in/mgo.v2/bson"
)

func AuthGet(ID string) (types.AuthTypeNoAccess, error) {
	collection := Session.DB("PP").C("users")
	var result types.AuthTypeNoAccess
	err := collection.Find(bson.M{"id": ID}).One(&result)
	log.Print(result)
	return result, err
}

func AuthSave(auth types.AuthType) (types.AuthTypeNoAccess, error) {
	collection := Session.DB("PP").C("users")
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

func UpdateRSVP(rsvp string, auth types.AuthTypeNoAccess) (types.AuthTypeNoAccess, error) {
	item, err := AuthGet(auth.ID)
	rsvpList := item.SavedSchedule
	var newList []string

	for _, val := range rsvpList {
		if rsvp != val {
			newList = append(newList, val)
		}
	}
	if len(newList) == len(rsvpList) {
		newList = append(newList, rsvp)
	}
	item.SavedSchedule = newList
	collection := Session.DB("PP").C("users")
	colQuerier := bson.M{"id": item.ID}
	change := bson.M{"$set": bson.M{"SavedSchedule": newList}}

	err = collection.Update(colQuerier, change)

	return item, err
}
