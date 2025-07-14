import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css';

// Örnek veri - gerçek uygulamada API'den gelecektir
const mockConversations = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    lastMessage: "Yarın görüşelim mi?",
    lastMessageTime: "14:30",
    unreadCount: 2,
    online: true,
    profileImage: null,
    messages: [
      { sender: 'other', text: "Merhaba, nasılsın?", time: "14:20" },
      { sender: 'me', text: "İyiyim, sen nasılsın?", time: "14:22" },
      { sender: 'other', text: "Ben de iyiyim, teşekkürler.", time: "14:25" },
      { sender: 'other', text: "Yarın görüşelim mi?", time: "14:30" },
    ]
  },
  {
    id: 2,
    name: "Ayşe Demir",
    lastMessage: "Dosyaları gönderdim.",
    lastMessageTime: "Dün",
    unreadCount: 0,
    online: false,
    lastSeen: "Bugün 10:45",
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    messages: [
      { sender: 'me', text: "Merhaba Ayşe, proje dosyalarını gönderebilir misin?", time: "Dün 18:15" },
      { sender: 'other', text: "Tabii ki, hemen gönderiyorum.", time: "Dün 18:20" },
      { sender: 'other', text: "Dosyaları gönderdim.", time: "Dün 18:30" },
    ]
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    lastMessage: "Toplantıyı 15:00'e aldık.",
    lastMessageTime: "Pazartesi",
    unreadCount: 0,
    online: true,
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      { sender: 'other', text: "Merhaba, toplantı saati değişti.", time: "Pazartesi 09:30" },
      { sender: 'other', text: "Toplantıyı 15:00'e aldık.", time: "Pazartesi 09:31" },
      { sender: 'me', text: "Tamam, teşekkürler bilgi için.", time: "Pazartesi 09:45" },
    ]
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Normalde burada bir API çağrısı yapılacak
    // Simüle edilmiş veri yükleme
    setTimeout(() => {
      setConversations(mockConversations);
      setActiveChat(mockConversations[0].id);
    }, 1000);
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const activeChatData = conversations.find(chat => chat.id === activeChat);

  return (
    <div className="app">
      <ChatList 
        conversations={conversations} 
        activeChat={activeChat} 
        setActiveChat={setActiveChat} 
      />
      <ChatWindow 
        activeChat={activeChat} 
        chatData={activeChatData} 
      />
    </div>
  );
}

export default App;