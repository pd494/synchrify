package models

import "time"

type Session struct {
	ID        string    `json:"session_id"`
	CreatedAt time.Time `json:"created_at"`
	Users[] User	`json:"users"`


	LastActive     time.Time `json:"last_active"`
} 