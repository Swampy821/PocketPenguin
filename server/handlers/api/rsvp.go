package api

import (
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pcon-schedule/server/libs/access"
	"github.com/swampy821/pcon-schedule/server/types"
)

func handleRSVP(r *http.Request, rend render.Render, auth types.AuthTypeNoAccess) {
	type success struct {
		Success bool
	}
	rend.JSON(200, success{Success: true})
}

func RSVP(w http.ResponseWriter, r *http.Request, rend render.Render) {
	if auth, valid := access.Valid(r); valid {
		handleRSVP(r, rend, auth)

		return
	}
	rend.Error(401)

}
