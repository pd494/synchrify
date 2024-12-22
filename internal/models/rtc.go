package models

type WebRTCMessage struct {
	Type      string          `json:"type"`
	SDP       interface{}     `json:"sdp,omitempty"`
	Candidate interface{}     `json:"candidate,omitempty"`
	SessionID string          `json:"sessionId"`
	UserID    string          `json:"userId"`
}
