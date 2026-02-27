package repository

import (
	"database/sql"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
)

type PaymentRepository interface {
	GetListPayment() (*entity.Payment, error)
}

type Payment struct {
	db *sql.DB
}

func NewPaymenyRepo(db *sql.DB) *Payment {
	return &Payment{db: db}
}

func (r *Payment) GetListPayment() (*entity.Payment, error) {
	row := r.db.QueryRow(`SELECT id, name. amount, created_at, status FROM payments`)
	var p entity.Payment
	if err := row.Scan(&p.ID, &p.Name, &p.CreatedAt, &p.Amount, &p.Status); err != nil {
		if err == sql.ErrNoRows {
			return nil, entity.ErrorNotFound("Data not found")
		}
		return nil, entity.WrapError(err, entity.ErrorCodeInternal, "db error")
	}
	return &p, nil
}
