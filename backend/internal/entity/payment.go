package entity

import "time"

type Payment struct {
	ID        int       `json:"id"`
	Amount    float64   `json:"amount"`
	Name      string    `json:"name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}
