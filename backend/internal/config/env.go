package config

import (
	"os"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
)

var (
	JwtSecret           = []byte(GetEnv("JWT_SECRET", "dev-secret-replace-me"))
	JwtExpired          = GetEnv("JWT_EXPIRED", "24h")
	HttpAddress         = GetEnv("HTTP_ADDR", ":8080")
	OpenapiYamlLocation = GetEnv("OPENAPIYAML_LOCATION", "../openapi.yaml")
)

func GetEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
