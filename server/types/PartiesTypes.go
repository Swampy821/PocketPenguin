package types

import "gopkg.in/mgo.v2/bson"

type Party struct {
	ID          bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name        string
	Description string
	Image       string
	Location    string
	Time        string
	Tags        []string
	Likes       []string
	Stars       int
	Star        bool
}

type PartyStartPost struct {
	ID string
}
