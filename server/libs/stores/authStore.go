package stores

import (
	uuid "github.com/satori/go.uuid"
	"github.com/swampy821/pocketpenguin/server/libs/access"
	"github.com/swampy821/pocketpenguin/server/types"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

func AuthGet(ID string, Username string, Password string) (types.AuthTypeNoAccess, error) {

	collection := Session.DB("PP").C("users")
	var result types.AuthTypeSave
	var cleanedResult types.AuthTypeNoAccess
	var err error
	if len(Username) > 0 {
		err = collection.Find(bson.M{"username": Username}).One(&result)
		if err == nil {
			err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(Password))
			if err != nil {
				result = types.AuthTypeSave{}
			}
		}
	} else {
		err = collection.Find(bson.M{"id": ID}).One(&result)
	}
	cleanedResult.Email = result.Email
	cleanedResult.ID = result.ID
	cleanedResult.JWT = result.JWT
	cleanedResult.Name = result.Name
	cleanedResult.Picture = result.Picture
	cleanedResult.SavedSchedule = result.SavedSchedule
	cleanedResult.Username = result.Username
	return cleanedResult, err
}

func UsernameTaken(Username string) bool {
	collection := Session.DB("PP").C("users")
	var result types.AuthTypeNoAccess
	err := collection.Find(bson.M{"username": Username}).One(&result)
	return err == nil
}

func AuthSave(auth types.AuthType) (types.AuthTypeNoAccess, error) {
	collection := Session.DB("PP").C("users")
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(auth.Password), bcrypt.DefaultCost)
	if len(auth.ID) == 0 {
		out := uuid.NewV4()
		auth.ID = out.String()
	}
	saveAuth := types.AuthTypeSave{Email: auth.Email, ID: auth.ID, Name: auth.Name, Picture: auth.Picture.Data.URL, Username: auth.Username, Password: string(hashedPassword)}
	err := collection.Insert(saveAuth)
	returnAuth := types.AuthTypeNoAccess{Email: auth.Email, ID: auth.ID, Name: auth.Name, Picture: auth.Picture.Data.URL, Username: auth.Username}
	return returnAuth, err
}

func AuthValidJWT(JWT string) (types.AuthTypeNoAccess, error) {
	auth, err := access.DecodeJWTToken(JWT)
	if err == nil {
		return AuthGet(auth.ID, "", "")
	}
	return auth, err
}

func UpdateRSVP(rsvp string, auth types.AuthTypeNoAccess) (types.AuthTypeNoAccess, error) {
	item, err := AuthGet(auth.ID, "", "")
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
