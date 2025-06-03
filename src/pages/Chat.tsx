
import React from 'react';
import Navigation from '@/components/Navigation';
import ChatInterface from '@/components/ChatInterface';

const Chat = () => {
  return (
    <div className="min-h-screen bg-studyflow-dark text-white">
      <Navigation />
      <div className="pt-16 h-screen flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
