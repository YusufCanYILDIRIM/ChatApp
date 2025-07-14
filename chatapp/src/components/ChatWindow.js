import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

function ChatWindow({ activeChat, chatData }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatData?.messages]);

  if (!chatData) {
    return <div className="no-chat-selected">Sohbet seçin veya yeni bir sohbet başlatın</div>;
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Mesaj gönderme işlemi buraya gelecek
      console.log(`Sending message to ${chatData.name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="avatar">
            {chatData.profileImage ? (
              <img src={chatData.profileImage} alt={chatData.name} />
            ) : (
              <div className="avatar-placeholder">{chatData.name[0]}</div>
            )}
          </div>
          <div>
            <h3>{chatData.name}</h3>
            <span className="status">{chatData.online ? 'Çevrimiçi' : 'Son görülme: ' + chatData.lastSeen}</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="icon-button"><i className="fa fa-search"></i></button>
          <button className="icon-button"><i className="fa fa-paperclip"></i></button>
          <button className="icon-button"><i className="fa fa-ellipsis-v"></i></button>
        </div>
      </div>
      
      <div className="messages-container">
        {chatData.messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {msg.text}
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-container" onSubmit={handleSend}>
        <button type="button" className="icon-button">
          <i className="fa fa-smile-o"></i>
        </button>
        <input
          type="text"
          placeholder="Mesaj yazın..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button" className="icon-button">
          <i className="fa fa-microphone"></i>
        </button>
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim()}
        >
          <i className="fa fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;