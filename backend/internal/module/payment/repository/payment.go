package repository

import (
	"database/sql"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
)

type PaymentRepository interface {
	GetListPayment(status string) (*[]entity.Payment, error)
}

type Payment struct {
	db *sql.DB
}

func NewPaymentRepo(db *sql.DB) *Payment {
	return &Payment{db: db}
}

func (r *Payment) GetListPayment(status string) (*[]entity.Payment, error) {
	query := `
		SELECT id, name, amount, created_at, status
		FROM payments
	`

	if status != "all" {
		query += " WHERE status = ?"
	}
	rows, err := r.db.Query(query, status)

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
	return &payments, nil
}
