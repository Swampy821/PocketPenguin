package types

type ScheduleSlot struct {
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
