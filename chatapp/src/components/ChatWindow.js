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

  // Sohbet verilerini analiz et
  const getChatInfo = () => {
    // Backend API'den gelen veri yapısı (participants dizisi var)
    if (chatData.participants && chatData.participants.length > 0) {
      const participant = chatData.participants[0];
      return {
        name: participant.name || "İsimsiz Kullanıcı",
        profileImage: participant.profileImage,
        online: false,
        lastSeen: "Bilinmiyor"
      };
    } 
    // Mock veri yapısı (doğrudan name özelliği var)
    else {
      return {
        name: chatData.name || "Bilinmeyen Kullanıcı",
        profileImage: chatData.profileImage,
        online: chatData.online || false,
        lastSeen: chatData.lastSeen || "Bilinmiyor"
      };
    }
  };

  const { name, profileImage, online, lastSeen } = getChatInfo();

  // Mesajları formatla
  const formatMessages = () => {
    if (!chatData.messages) return [];
    
    return chatData.messages.map((msg, index) => ({
      id: msg.id || `msg-${index}`,
      sender: msg.sender,
      text: msg.text,
      time: msg.time || formatTime(msg.timestamp)
    }));
  };

  // Zaman formatı
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    // Basit formatlama
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const messages = formatMessages();

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Mesaj gönderme işlemi buraya gelecek
      console.log(`Sending message to ${name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="avatar">
            {profileImage ? (
              <img src={profileImage} alt={name} />
            ) : (
              <div className="avatar-placeholder">{name[0] || '?'}</div>
            )}
          </div>
          <div>
            <h3>{name}</h3>
            <span className="status">{online ? 'Çevrimiçi' : 'Son görülme: ' + lastSeen}</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="icon-button"><i className="fa fa-search"></i></button>
          <button className="icon-button"><i className="fa fa-paperclip"></i></button>
          <button className="icon-button"><i className="fa fa-ellipsis-v"></i></button>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={msg.id || index} 
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