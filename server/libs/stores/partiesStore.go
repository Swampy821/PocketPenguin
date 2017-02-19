package stores

import (
	"log"

	"github.com/swampy821/pocketpenguin/server/types"
	"gopkg.in/mgo.v2/bson"
)

func PartiesGet(ip string) []types.Party {
	var parties []types.Party
	collection := Session.DB("PP").C("parties")
	err := collection.Find(bson.M{}).All(&parties)
	if err != nil {
		log.Print("Error: " + err.Error())
	}

	for index, el := range parties {
		if inStarArray(string(ip), el.Likes) {
			parties[index].Star = true
			parties[index].Stars = len(el.Likes)
		}
	}

	return parties
}

func getParty(id string) types.Party {
	collection := Session.DB("PP").C("parties")
	var party types.Party
	err := collection.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&party)
	if err != nil {
		log.Print("Error: " + err.Error())
	}
	return party
}

func inStarArray(ip string, stars []string) bool {
	for _, el := range stars {
		if el == ip {
			return true
		}
	}

	return false
}

func removeFromArray(el string, arr []string) []string {
	var elar []string
	for _, item := range arr {
		if item != el {
			elar = append(elar, item)
		}
	}
	return elar
}

func PartiesStarToggle(partyId string, ip string) (types.Party, error) {
	collection := Session.DB("PP").C("parties")
	party := getParty(partyId)
	starInArray := inStarArray(ip, party.Likes)
	if starInArray {
		party.Likes = removeFromArray(ip, party.Likes)
	} else {
		party.Likes = append(party.Likes, ip)
	}

	err := collection.Update(bson.M{"_id": party.ID}, party)
	if err != nil {
		log.Print("Error: " + err.Error())
	}

	party.Stars = len(party.Likes)
	party.Likes = nil
	return party, err
}
