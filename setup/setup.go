package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	mgo "gopkg.in/mgo.v2"
)

type ScheduleType struct {
	Slots []scheduleSlot `xml:"row"`
}

type scheduleRoot struct {
	Sched ScheduleType `xml:"root"`
}

type scheduleSlot struct {
	Day       string `xml:"FIELD1"`
	EndDay    string `xml:"FIELD3"`
	Time      string `xml:"FIELD2"`
	EndTime   string `xml:"FIELD4"`
	Title     string `xml:"FIELD7"`
	Topic     string `xml:"FIELD6"`
	Room      string `xml:"FIELD5"`
	Blurb     string `xml:"FIELD9"`
	AllDay    string `xml:"FIELD12"`
	Presenter string `xml:"FIELD8"`
	Active    bool
}

func main() {
	session, err := mgo.Dial("localhost")
	c := session.DB("PP").C("sched")
	xmlFile, err := os.Open("data.xml")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer xmlFile.Close()
	b, _ := ioutil.ReadAll(xmlFile)

	var parsedXML ScheduleType

	xml.Unmarshal(b, &parsedXML)

	for _, element := range parsedXML.Slots {
		element.Active = true
		c.Insert(element)
	}
	log.Print("Setup Complete")
}
