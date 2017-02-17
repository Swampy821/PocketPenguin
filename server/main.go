package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/swampy821/pocketpenguin/server/libs/access"
	"github.com/swampy821/pocketpenguin/server/libs/stores"
	"github.com/swampy821/pocketpenguin/server/routes"
)

func main() {
	access.GetAppToken()
	stores.InitStores()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	m := martini.Classic()
	m.Use(martini.Static("./static"))
	m.Use(render.Renderer(render.Options{
		Extensions: []string{".html"},
		Directory:  "./static",
	}))
	m.NotFound(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/index.html")
	})
	log.Print("Adding routes")
	routes.AddRoutes(m)
	m.RunOnAddr(":" + port)

	m.Run()
}
