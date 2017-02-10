package routes

import (
	"log"

	"github.com/go-martini/martini"
	"github.com/swampy821/pcon-schedule/server/handlers/api"
)

func AddRoutes(m *martini.ClassicMartini) {

	log.Print("Adding auth /api/auth")
	m.Post("/api/auth", api.Auth)

	log.Print("Adding auth /api/rsvp")
	m.Post("/api/rsvp", api.RSVP)

	log.Print("Adding auth /api/schedule")
	m.Get("/api/schedule", api.Schedule)

	log.Print("Adding auth /api/schedule/day")
	m.Get("/api/schedule/day", api.ScheduleByDay)

}
