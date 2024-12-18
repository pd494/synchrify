package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	// "strings"
	"time"

	"github.com/google/uuid"
	"synchrify/internal/models"
)

var sessions = make(map[string]models.Session)

func Health(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "great!")
}

func CreateSession(w http.ResponseWriter, r *http.Request) {
	sessionID := uuid.New().String()
	
	newSession := models.Session{
		ID:        sessionID,
		CreatedAt: time.Now(),
		Users:     []models.User{},
		LastActive: time.Now(),
	}
	
	sessions[sessionID] = newSession

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sessions)
}

func GetUsersInSession(w http.ResponseWriter, r*http.Request){
	sessionID := r.URL.Query().Get("session_id")
	if sessionID == "" {
		http.Error(w, "Session ID is required", http.StatusBadRequest)
	}
	session := sessions[sessionID]
	usersInSession := session.Users
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usersInSession)


}

func AddUser(w http.ResponseWriter, r *http.Request){
	sessionID := r.URL.Query().Get("session_id")
	username:= r.URL.Query().Get("username")

	var user models.User
	user.UserID = username
	user.CreatedAt = time.Now()

	if sessionID == "" {
		http.Error(w, "Session ID is required", http.StatusBadRequest)
		return
	}
	_, ok := sessions[sessionID]
	if ok {
		session:= sessions[sessionID]
		session.Users = append(session.Users, user)
		sessions[sessionID] = session
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(session)
		return
	} else {
		http.Error(w, "Session not found", http.StatusNotFound)
		return
	}
	// json.NewEncoder(w).Encode(sessions[sessionID].Users)

}

func GetSession(w http.ResponseWriter, r *http.Request) {
	sessionID := r.URL.Query().Get("session_id")

	if sessionID == "" {
		http.Error(w, "Session ID is required", http.StatusBadRequest)
		return
	}

	session, ok := sessions[sessionID]
	if ok {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(session)
	} else {
		json.NewEncoder(w).Encode(session)
		// http.Error(w, "Session not found", http.StatusNotFound)
	}
}
