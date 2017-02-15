package api

import (
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pocketpenguin/server/libs/stores"
)

func Schedule(r *http.Request, rend render.Render) {
	rend.JSON(200, stores.ScheduleGet())
}

func ScheduleByDay(rend render.Render) {
	rend.JSON(200, stores.ScheduleByDay())
}
