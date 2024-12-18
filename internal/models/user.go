package models

import (
	"time"
)
type User struct{
	UserID        string    `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	// Add more fields as needed:
	
	LastActive     time.Time `json:"last_active"`
	

}