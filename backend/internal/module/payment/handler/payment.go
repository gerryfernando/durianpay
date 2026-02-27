package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	paymentUsecase "github.com/durianpay/fullstack-boilerplate/internal/module/payment/usecase"
	"github.com/durianpay/fullstack-boilerplate/internal/openapigen"
)

type PaymentHandler struct {
	paymentUC paymentUsecase.PaymentUsecase
}

func NewPaymentHandler(paymentUC paymentUsecase.PaymentUsecase) *PaymentHandler {
	return &PaymentHandler{
		paymentUC: paymentUC,
	}
}

func (h *PaymentHandler) GetV1Payments(w http.ResponseWriter, r *http.Request) {
	payments, err := h.paymentUC.GetPayments()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var respPayments []openapigen.Payment
	if payments != nil {
		for _, p := range *payments {

			id := strconv.Itoa(p.ID)
			merchant := p.Merchant
			amount := fmt.Sprintf("%.2f", p.Amount)
			status := p.Status
			createdAt := p.CreatedAt

			respPayments = append(respPayments, openapigen.Payment{
				Id:        &id,
				Merchant:  &merchant,
				Amount:    &amount,
				Status:    &status,
				CreatedAt: &createdAt,
			})
		}
	}

	response := openapigen.PaymentListResponse{
		Payments: &respPayments,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
