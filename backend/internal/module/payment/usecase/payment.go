package usecase

import (
	"fmt"
	"time"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/repository"
)

type PaymentUsecase interface {
	GetPayments() (*[]entity.Payment, error)
}

type Payments struct {
	repo      repository.PaymentRepository
	jwtSecret []byte
	ttl       time.Duration
}

func NewPaymentsUsecase(repo repository.PaymentRepository, jwtSecret []byte, ttl time.Duration) *Payments {
	return &Payments{repo: repo, jwtSecret: jwtSecret, ttl: ttl}
}

func (a *Payments) GetPayments() (*[]entity.Payment, error) {
	payments, err := a.repo.GetListPayment()
	if err != nil {
		return nil, err
	}
	fmt.Printf("paymentsUsecase: %v\n", payments)
	return payments, nil
}
