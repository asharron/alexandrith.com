package main

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
	"github.com/asharron/alexandrith.com/fiber/graph/generated"
	"github.com/asharron/alexandrith.com/fiber/graph/graph"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func connectToDatabase() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
}

func main() {
    app := fiber.New()

    srv := handler.NewDefaultServer(generated.NewExecutableSchema(graph.NewResolver()))
    gqlHandler := srv.Handler()
    playground := playground.Handler("Graqphql playground", "/query")

	app.Static("*", "../gatsby/public/index.html")

    log.Fatal(app.Listen(":3000"))
}