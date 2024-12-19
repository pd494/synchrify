package connections


import (
	"github.com/gorilla/websocket"

	"sync"
)


type Hub struct{
	clients map[string]map[*Client]bool
	mu sync.Mutex
}

type Client struct{
	Hub *Hub
	Conn *websocket.Conn
	
	SessionID string
}

func NewHub() *Hub{
	return &Hub{
		clients: make(map[string]map[*Client]bool),

	}
}

func (h *Hub) RegisterClient(client *Client){
	h.mu.Lock()
	defer h.mu.Unlock()

	if h.clients[client.SessionID] == nil{
		h.clients[client.SessionID]= make(map[*Client]bool)
		
	}
	h.clients[client.SessionID][client]= true



}

func (h *Hub) UnregisterClient(client *Client) {
    h.mu.Lock() // Lock the Hub to prevent concurrent access
    defer h.mu.Unlock() // Ensure the lock is released when the function exits

    // Check if there are clients registered for this session ID
    if _, ok := h.clients[client.SessionID]; ok {
        // Remove the client from the map for this session ID
        delete(h.clients[client.SessionID], client)
    }
}

func (h *Hub) BroadcastToSession(sessionID string, message string) {
	h.mu.Lock()
	defer h.mu.Unlock()


	if clients, ok:= h.clients[sessionID]; ok{
		for client := range clients{
			err:= client.Conn.WriteMessage(websocket.TextMessage, []byte(message))

			if err!= nil{
				client.Conn.Close()
				delete(clients, client)
			}

		}
	}

}