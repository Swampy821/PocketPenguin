package api

import (
	"io/ioutil"
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pocketpenguin/server/libs/access"
	"github.com/swampy821/pocketpenguin/server/libs/stores"
	"github.com/swampy821/pocketpenguin/server/types"
)

func handleRSVP(r *http.Request, rend render.Render, auth types.AuthTypeNoAccess) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	data := string(body)

	ret, err := stores.UpdateRSVP(data, auth)
	if err != nil {
		rend.Error(500)
		return
	}
	rend.JSON(200, ret)
}

func RSVP(w http.ResponseWriter, r *http.Request, rend render.Render) {
	if auth, valid := access.Valid(r); valid {
		handleRSVP(r, rend, auth)

		return
	}
	rend.Error(401)

}
