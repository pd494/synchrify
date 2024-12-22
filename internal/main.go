package main

import (
	"log"
	"net/http"

	"synchrify/handlers"
)

func main() {
	http.HandleFunc("/", handlers.Health)
	http.HandleFunc("/createSession", handlers.CreateSession)
	http.HandleFunc("/getSession", handlers.GetSession)
	http.HandleFunc("/addUser", handlers.AddUser)
	http.HandleFunc("/ws", handlers.HandleWebSocket)
	http.HandleFunc("/ws/screenshare", handlers.HandleScreenShare)

	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
