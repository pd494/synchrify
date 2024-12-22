package models
import (
	"time"
)
type ChatMessage struct {
	UserID    string    `json:"userId"`
	Text      string    `json:"text"`
	Timestamp time.Time `json:"timestamp"`
}