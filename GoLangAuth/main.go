package main

import (
	"GoLangAuth/database"
	"GoLangAuth/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"strings"
)

func main() {
	database.Connect()
	app := fiber.New()
	app.Use(cors.New(cors.ConfigDefault))
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "*",
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
			fiber.MethodHead,
			fiber.MethodPut,
			fiber.MethodDelete,
			fiber.MethodPatch,
		}, ","),
		AllowHeaders: "*",
		MaxAge:       36000,
	}))
	routes.Setup(app)
	err := app.Listen(":8080")
	if err != nil {
		return
	}
}
