import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

function ChatWindow({ activeChat, chatData, user, sendMessage }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end" 
      });
    }
  };

  // Mevcut mesajları yükle
  useEffect(() => {
    if (chatData?.messages) {
      setMessages(formatMessages());
    }
  }, [chatData]);

  // Mesajlar değiştiğinde otomatik kaydır
  useEffect(scrollToBottom, [messages]);

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
      sender: msg.sender === user?.id ? 'me' : 'other',
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

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setSending(true);
    
    try {
      // Mesajı önbelleğe al ve temizle
      const messageToSend = message;
      setMessage('');
      
      // Yerel UI'ı güncelleyerek kullanıcıya hızlı geri bildirim ver
      const tempMessage = {
        id: `temp-${Date.now()}`,
        sender: 'me',
        text: messageToSend,
        time: formatTime(new Date())
      };
      
      setMessages(prevMessages => [...prevMessages, tempMessage]);
      
      // Scroll işlemini zorla
      setTimeout(() => scrollToBottom(), 50);
      
      // App.js'deki sendMessage fonksiyonunu kullanarak mesajı gönder
      if (sendMessage) {
        await sendMessage(activeChat, messageToSend);
      }
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      alert('Mesaj gönderilemedi: ' + error.message);
    } finally {
      setSending(false);
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
          disabled={sending}
        />
        <button type="button" className="icon-button">
          <i className="fa fa-microphone"></i>
        </button>
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim() || sending}
        >
          <i className={sending ? "fa fa-spinner fa-spin" : "fa fa-paper-plane"}></i>
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;