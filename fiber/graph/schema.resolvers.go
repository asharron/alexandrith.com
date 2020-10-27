package main

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	main "alexandrith.com/graph/generated"
	main1 "alexandrith.com/graph/model"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input main1.NewTodo) (*main1.Todo, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Todos(ctx context.Context) ([]*main1.Todo, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns main.MutationResolver implementation.
func (r *Resolver) Mutation() main.MutationResolver { return &mutationResolver{r} }

// Query returns main.QueryResolver implementation.
func (r *Resolver) Query() main.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
