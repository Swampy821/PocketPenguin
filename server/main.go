package main

import (
	"log"
	"os"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/swampy821/pcon-schedule/server/libs/access"
	"github.com/swampy821/pcon-schedule/server/libs/stores"
	"github.com/swampy821/pcon-schedule/server/routes"
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
	m.Use(render.Renderer())
	log.Print("Adding routes")
	routes.AddRoutes(m)
	m.RunOnAddr(":" + port)

	m.Run()
}
