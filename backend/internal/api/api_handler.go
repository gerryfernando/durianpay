package api

import (
	"fmt"
	"net/http"

	ah "github.com/durianpay/fullstack-boilerplate/internal/module/auth/handler"
	pm "github.com/durianpay/fullstack-boilerplate/internal/module/payment/handler"
	"github.com/durianpay/fullstack-boilerplate/internal/openapigen"
)

type APIHandler struct {
	Auth     *ah.AuthHandler
	Payments *pm.PaymentHandler
}

var _ openapigen.ServerInterface = (*APIHandler)(nil)

func (h *APIHandler) PostDashboardV1AuthLogin(w http.ResponseWriter, r *http.Request) {
	h.Auth.PostDashboardV1AuthLogin(w, r)
}

func (h *APIHandler) GetDashboardV1Payments(w http.ResponseWriter, r *http.Request, body openapigen.GetDashboardV1PaymentsParams) {
	fmt.Printf("body.Status: %v\n", *body.Status)
	h.Payments.GetV1Payments(w, r, body)
}
