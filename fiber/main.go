package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Static("*", "../../gatsby/public/index.html")

    app.Listen(":3000")
}