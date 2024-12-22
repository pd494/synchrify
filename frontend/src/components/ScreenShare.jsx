import React, { useState, useRef, useEffect } from 'react';
import { FaDesktop, FaStop } from 'react-icons/fa';

const ScreenShare = ({ sessionId, userId }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`wss://1fc4-2601-647-4d7c-6c50-1d5d-b0ab-52fa-60d5.ngrok-free.app/ws/screenshare?session_id=${sessionId}&user_id=${userId}`);
    
    ws.current.onopen = () => {
      console.log('WebSocket connected for screen sharing');
    };

    ws.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message.type);

      if (message.type === 'offer') {
        handleOffer(message);
      } else if (message.type === 'answer') {
        handleAnswer(message);
      } else if (message.type === 'ice-candidate') {
        handleIceCandidate(message);
      }
    };

    return () => {
      stopScreenShare();
      if (ws.current) ws.current.close();
    };
  }, [sessionId, userId]);

  const handleOffer = async (message) => {
    try {
      peerConnection.current = createPeerConnection();
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.sdp));

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      ws.current.send(JSON.stringify({
        type: 'answer',
        sdp: answer,
        sessionId,
        userId
      }));
    } catch (err) {
      console.error('Error handling offer:', err);
    }
  };

  const handleAnswer = async (message) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.sdp));
    } catch (err) {
      console.error('Error handling answer:', err);
    }
  };

  const handleIceCandidate = async (message) => {
    try {
      if (peerConnection.current) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    } catch (err) {
      console.error('Error handling ICE candidate:', err);
    }
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setIsSharing(true);
      
      peerConnection.current = createPeerConnection();
      
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      
      ws.current.send(JSON.stringify({
        type: 'offer',
        sdp: offer,
        sessionId,
        userId
      }));

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error starting screen share:", err);
      setIsSharing(false);
    }
  };

  const stopScreenShare = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    setIsSharing(false);
    if (peerConnection.current) {
      peerConnection.current.close();
    }
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current.send(JSON.stringify({
          type: 'ice-candidate',
          candidate: event.candidate,
          sessionId,
          userId
        }));
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  return (
    <div className="flex-1 bg-gray-50 p-4">
      <div className="bg-gray-900 rounded-xl h-full flex items-center justify-center shadow-lg overflow-hidden relative">
      {remoteStream && (
  <video
    ref={remoteVideoRef}
    autoPlay
    playsInline
    className="w-full h-full object-contain"
  />
)}

{/* Always show the share button (instead of hiding it when remoteStream is present) */}
<div className="text-center space-y-6 p-8">
  <FaDesktop className="w-20 h-20 text-gray-400 mx-auto" />
  <div>
    <h3 className="text-2xl font-semibold text-white mb-3">
      {isSharing ? 'Sharing Your Screen' : 'Share Your Screen'}
    </h3>
    <button
      onClick={isSharing ? stopScreenShare : startScreenShare}
      className="px-8 py-3 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 active:transform active:scale-95 transition-all flex items-center gap-2 mx-auto"
    >
      {isSharing ? <FaStop /> : <FaDesktop />}
      {isSharing ? 'Stop Sharing' : 'Start Sharing'}
    </button>
  </div>
</div>


        {isSharing && (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute bottom-4 right-4 w-64 rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ScreenShare;