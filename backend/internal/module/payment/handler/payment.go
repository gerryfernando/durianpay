package handler

import (
	"database/sql"
)

type APIHandler struct {
	DB *sql.DB
}

// func (h *APIHandler) GetDashboardV1Payments(x) {
// 	query := `
// 		SELECT id, amount, status, created_at
// 		FROM payments
// 		WHERE 1=1
// 	`

// 	args := []interface{}{}

// 	// Filter: status
// 	if params.Status != nil {
// 		query += " AND status = ?"
// 		args = append(args, *params.Status)
// 	}

// 	// Filter: id
// 	if params.Id != nil {
// 		query += " AND id = ?"
// 		args = append(args, *params.Id)
// 	}

// 	// Sorting
// 	if params.Sort != nil && *params.Sort == "asc" {
// 		query += " ORDER BY created_at ASC"
// 	} else {
// 		query += " ORDER BY created_at DESC"
// 	}

// 	rows, err := h.DB.Query(query, args...)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var payments []openapigen.Payment

// 	for rows.Next() {
// 		var p openapigen.Payment
// 		err := rows.Scan(
// 			&p.Id,
// 			&p.Amount,
// 			&p.Status,
// 			&p.CreatedAt,
// 		)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		payments = append(payments, p)
// 	}

// 	response := openapigen.PaymentListResponse{
// 		Data: payments,
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(response)
// }
