package usecase

import (
	"time"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/auth/repository"
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

// Login verifies email + password and returns a JWT.
// func (a *Payments) GetPaymentList() (string, *entity.Payment, error) {
// 	payments, err := a.repo.GetListPayment()
// 	if err != nil {
// 		return "", nil, err
// 	}
// 	if len(payments) == 0 {
// 		return "", nil, entity.ErrorNotFound("Data not found")
// 	}

// 	claims := jwt.MapClaims{
// 		"sub": payments.ID,
// 		"exp": time.Now().Add(a.ttl).Unix(),
// 		"iat": time.Now().Unix(),
// 	}
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	signed, err := token.SignedString(a.jwtSecret)
// 	if err != nil {
// 		return "", nil, entity.WrapError(err, entity.ErrorCodeUnauthorized, "invalid credentials")
// 	}
// 	return signed, payments, nil
// }
