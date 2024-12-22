package models

import "time"

type User struct {
	UserID    string    `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}
