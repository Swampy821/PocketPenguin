package api

import (
	"log"
	"net"
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pocketpenguin/server/libs/stores"
)

func Schedule(r *http.Request, rend render.Render) {
	rend.JSON(200, stores.ScheduleGet())
}

func ScheduleByDay(r *http.Request, rend render.Render) {

	ip, _, _ := net.SplitHostPort(r.RemoteAddr)
	log.Print(ip)
	rend.JSON(200, stores.ScheduleByDay())
}
