package api

import (
	"encoding/json"
	"io/ioutil"
	"net"
	"net/http"

	"github.com/martini-contrib/render"
	"github.com/swampy821/pocketpenguin/server/libs/stores"
	"github.com/swampy821/pocketpenguin/server/types"
)

func Parties(r *http.Request, rend render.Render) {
	ipAddr, _, _ := net.SplitHostPort(r.RemoteAddr)
	rend.JSON(200, stores.PartiesGet(ipAddr))
}

func PartiesStar(r *http.Request, rend render.Render) {
	ipAddr, _, _ := net.SplitHostPort(r.RemoteAddr)
	body, _ := ioutil.ReadAll(r.Body)
	var data types.PartyStartPost
	json.Unmarshal(body, &data)
	_, err := stores.PartiesStarToggle(data.ID, ipAddr)
	if err != nil {
		rend.Error(404)
		return
	}

	parties := stores.PartiesGet(ipAddr)

	rend.JSON(200, parties)

}
