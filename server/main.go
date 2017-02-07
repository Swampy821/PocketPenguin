package main

import "github.com/gin-gonic/gin"

func main() {

	r := gin.Default()

	r.Static("/", "./static")
	r.Run(":8081")

}
