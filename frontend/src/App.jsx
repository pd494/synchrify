import React from 'react';
import Sidebar from './components/Sidebar';
import ScreenShare from './components/ScreenShare';
import Chat from './components/Chat';

function App() {
  const sessionId = "faaef2c3-b300-4e2a-8aeb-f249bf07223c"; // Use the same session ID as Chat
  const userId = `user-${Math.random().toString(36).substr(2, 5)}`;
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ScreenShare sessionId={sessionId} userId={userId} />
      <Chat sessionId={sessionId} />
    </div>
  );
}

export default App;