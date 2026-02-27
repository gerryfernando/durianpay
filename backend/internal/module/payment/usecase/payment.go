package usecase

import (
	"fmt"
	"time"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/repository"
)

type PaymentUsecase interface {
	Login(email string, password string) (string, *entity.Payment, error)
}

type Payments struct {
	repo      repository.PaymentRepository
	jwtSecret []byte
	ttl       time.Duration
}

func PaymentsUsecase(repo repository.PaymentRepository, jwtSecret []byte, ttl time.Duration) *Payments {
	return &Payments{repo: repo, jwtSecret: jwtSecret, ttl: ttl}
}

func (a *Payments) GetPayments() (*[]entity.Payment, error) {
	payments, _ := a.repo.GetListPayment()
	fmt.Println(payments)
	return payments, nil
}
