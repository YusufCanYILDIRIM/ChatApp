import React from 'react';
import './ChatList.css';

function ChatList({ conversations, activeChat, setActiveChat }) {
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
        {conversations.map(chat => (
          <div 
            key={chat.id}
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`} 
            onClick={() => setActiveChat(chat.id)}
          >
            <div className="avatar">
              {chat.profileImage ? (
                <img src={chat.profileImage} alt={chat.name} />
              ) : (
                <div className="avatar-placeholder">{chat.name[0]}</div>
              )}
            </div>
            <div className="chat-info">
              <div className="chat-header">
                <h3>{chat.name}</h3>
                <span className="time">{chat.lastMessageTime}</span>
              </div>
              <p className="last-message">{chat.lastMessage}</p>
              {chat.unreadCount > 0 && (
                <span className="unread-count">{chat.unreadCount}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;