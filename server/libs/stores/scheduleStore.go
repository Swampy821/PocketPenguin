package stores

import (
	"log"
	"time"

	"github.com/swampy821/pocketpenguin/server/types"
	"gopkg.in/mgo.v2/bson"
)

const runEvery = 30000

var rootSchedule []types.ScheduleSlot
var lastRun int32

func getTime() int32 {
	return int32(time.Now().Unix())
}

func ScheduleRenew() {
	lastRun = getTime()
	collection := Session.DB("PP").C("sched")
	err := collection.Find(bson.M{"active": true}).All(&rootSchedule)
	if err != nil {
		log.Print("Error: " + err.Error())
	}
}

func ScheduleGet() []types.ScheduleSlot {
	if lastRun+runEvery < getTime() {
		ScheduleRenew()
	}
	return rootSchedule
}

func scheduleDayInDays(day string, dayArray []types.ScheduleDay) bool {
	for _, el := range dayArray {
		if el.Day == day {
			return true
		}
	}
	return false
}

func scheduleAddSlotsForDay(day string, schedule []types.ScheduleSlot) []types.ScheduleSlot {
	var slots []types.ScheduleSlot
	for _, el := range schedule {
		if el.Day == day {
			slots = append(slots, el)
		}
	}
	return slots
}

func ScheduleByDay() types.ScheduleDays {
	var endSched types.ScheduleDays
	schedule := ScheduleGet()
	for _, slotEl := range schedule {
		if scheduleDayInDays(slotEl.Day, endSched.Days) == false {
			endSched.Days = append(endSched.Days, types.ScheduleDay{Day: slotEl.Day, Slots: scheduleAddSlotsForDay(slotEl.Day, schedule)})
		}

	}

	return endSched

}
