import React, { useRef, useState, useEffect } from 'react';
import { FaComment, FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
  // Hardcode session ID and generate random user ID
  const HARDCODED_SESSION = "faaef2c3-b300-4e2a-8aeb-f249bf07223c";
  const [userId] = useState(`user-${Math.random().toString(36).substr(2, 5)}`);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // const socket = new WebSocket(`ws://localhost:9090/ws?session_id=${HARDCODED_SESSION}&user_id=${userId}`);
const socket = new WebSocket(`wss://1fc4-2601-647-4d7c-6c50-1d5d-b0ab-52fa-60d5.ngrok-free.app/ws?session_id=${HARDCODED_SESSION}&user_id=${userId}`);
    socket.onopen = () => {
      console.log('Connected to chat as:', userId);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: message.userId,
        text: message.text,
        timestamp: new Date(message.timestamp)
      }]);
    };

    socket.onclose = () => {
      console.log('Disconnected from chat');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [HARDCODED_SESSION, userId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !ws) return;

    ws.send(newMessage);
    setNewMessage('');
  };

  return (
    <div className="w-chat bg-white h-full shadow-lg">
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-subtitle font-semibold flex items-center gap-2 text-gray-800">
            <FaComment className="text-accent-500" />
            Chat
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map(message => (
            <div key={message.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all">
              <div className="font-semibold text-sm text-accent-500 mb-1">{message.user}</div>
              <div className="text-sm text-gray-700">{message.text}</div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-100">
          <form onSubmit={sendMessage} className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-accent-500 hover:text-accent-600 transition-all"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;