// components/Chat.js

import React, { useContext, useState } from 'react';
//import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;