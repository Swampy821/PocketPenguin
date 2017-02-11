package types

import "gopkg.in/mgo.v2/bson"

type ScheduleSlot struct {
	ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Day       string
	EndDay    string
	Time      string
	EndTime   string
	Title     string
	Topic     string
	Room      string
	Blurb     string
	AllDay    string
	Presenter string
	Active    bool
}

type ScheduleDay struct {
	Day   string
	Slots []ScheduleSlot
}

type ScheduleDays struct {
	Days []ScheduleDay
}
