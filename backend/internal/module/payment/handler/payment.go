package handler

import (
	"fmt"
	"net/http"

	paymentUsecase "github.com/durianpay/fullstack-boilerplate/internal/module/payment/usecase"
)

type PaymentHandler struct {
	paymentUC paymentUsecase.Payments
}

func (h *PaymentHandler) GetV1Payments(w http.ResponseWriter, r *http.Request) {
	payments, _ := h.paymentUC.GetPayments()
	fmt.Println(payments)

}
