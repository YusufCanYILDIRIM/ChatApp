import React from 'react';
import './ChatList.css';

function ChatList({ conversations, activeChat, setActiveChat, onLogout }) {
  // Chat nesnelerinden isim ve resim bilgisini çıkarma helper fonksiyonu
  const getChatDisplayInfo = (chat) => {
    // Backend API'den gelen veri yapısı (participants dizisi var)
    if (chat.participants && chat.participants.length > 0) {
      const participant = chat.participants[0];
      return {
        name: participant.name || "İsimsiz Kullanıcı",
        profileImage: participant.profileImage
      };
    } 
    // Mock veri yapısı (doğrudan name özelliği var)
    else if (chat.name) {
      return {
        name: chat.name,
        profileImage: chat.profileImage
      };
    }
    // Hiçbir duruma uymuyorsa varsayılan değer döndür
    else {
      return {
        name: "Bilinmeyen Kullanıcı",
        profileImage: null
      };
    }
  };

  // Son mesaj ve zaman bilgisini çıkarma
  const getLastMessageInfo = (chat) => {
    // Backend API'den gelen veri yapısı
    if (chat.lastMessage && typeof chat.lastMessage === 'object') {
      return {
        text: chat.lastMessage.text || "",
        time: formatTime(chat.lastMessage.timestamp)
      };
    } 
    // Mock veri yapısı
    else {
      return {
        text: chat.lastMessage || "",
        time: chat.lastMessageTime || ""
      };
    }
  };

  // Zaman formatı
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    // Basit formatlama
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Sohbetler</h2>
        <button className="new-chat-button">
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Sohbet ara..." 
          className="search-input"
        />
      </div>
      <div className="conversations-list">
        {conversations.map(chat => {
          const { name, profileImage } = getChatDisplayInfo(chat);
          const { text: lastMessageText, time: lastMessageTime } = getLastMessageInfo(chat);
          
          return (
            <div 
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`} 
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="avatar">
                {profileImage ? (
                  <img src={profileImage} alt={name} />
                ) : (
                  <div className="avatar-placeholder">{name[0] || "?"}</div>
                )}
              </div>
              <div className="chat-info">
                <div className="chat-header">
                  <h3>{name}</h3>
                  <span className="time">{lastMessageTime}</span>
                </div>
                <p className="last-message">{lastMessageText}</p>
                {chat.unreadCount > 0 && (
                  <span className="unread-count">{chat.unreadCount}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Çıkış yapma butonu ekleyelim */}
      {onLogout && (
        <div className="logout-container">
          <button onClick={onLogout} className="logout-button">
            <i className="fa fa-sign-out"></i> Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatList;