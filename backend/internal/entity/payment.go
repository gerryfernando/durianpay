package entity

type Payment struct {
	ID        int     `json:"id"`
	Amount    float64 `json:"amount"`
	Name      string  `json:"name"`
	Status    string  `json:"status"`
	CreatedAt string  `json:"created_at"`
}
