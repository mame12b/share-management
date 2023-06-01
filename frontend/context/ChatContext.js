// context/ChatContext.js

import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    socket.emit('chat message', message);
  };

  socket.on('chat message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };