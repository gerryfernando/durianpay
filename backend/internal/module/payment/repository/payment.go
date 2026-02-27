package repository

import (
	"database/sql"
	"fmt"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
)

type PaymentRepository interface {
	GetListPayment() (*[]entity.Payment, error)
}

type Payment struct {
	db *sql.DB
}

func NewPaymentRepo(db *sql.DB) *Payment {
	return &Payment{db: db}
}

func (r *Payment) GetListPayment() (*[]entity.Payment, error) {
	rows, err := r.db.Query(`
	SELECT id, name, amount, created_at, status 
	FROM payments
`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var payments []entity.Payment

	for rows.Next() {
		var p entity.Payment

		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Amount,
			&p.CreatedAt,
			&p.Status,
		); err != nil {
			return nil, err
		}

		payments = append(payments, p)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	fmt.Printf("payments: %v\n", &payments)
	return &payments, nil
}
