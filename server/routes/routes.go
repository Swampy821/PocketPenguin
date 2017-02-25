package routes

import (
	"log"

	"github.com/go-martini/martini"
	"github.com/swampy821/pocketpenguin/server/handlers/api"
)

func AddRoutes(m *martini.ClassicMartini) {

	log.Print("Adding route /api/auth")
	m.Post("/api/auth", api.Auth)

	log.Print("Adding route /api/rsvp")
	m.Post("/api/rsvp", api.RSVP)

	log.Print("Adding route /api/schedule")
	m.Get("/api/schedule", api.Schedule)

	log.Print("Adding route /api/schedule/day")
	m.Get("/api/schedule/day", api.ScheduleByDay)

	log.Print("Adding route /api/parties")
	m.Get("/api/parties", api.Parties)

	log.Print("Adding post /api/parties/star")
	m.Post("/api/parties/star", api.PartiesStar)

	log.Print("Added route /api/schedule/{id}")
	m.Get("/api/schedule/:id", api.ScheduleById)

}
