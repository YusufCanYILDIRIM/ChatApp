import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan token kontrolü
    const checkAuth = async () => {
      const token = localStorage.getItem('chatAppToken');
      const userData = localStorage.getItem('chatAppUser');
      
      if (token && userData) {
        try {
          // Token doğrulama
          const response = await fetch('http://localhost:5000/api/auth/verify-token', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const data = await response.json();
          
          if (data.valid) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
            fetchConversations(token);
          } else {
            // Geçersiz token, çıkış yap
            handleLogout();
          }
        } catch (error) {
          console.error('Token doğrulama hatası:', error);
          handleLogout();
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const fetchConversations = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/chats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
        if (data.length > 0) {
          setActiveChat(data[0].id);
        }
      }
    } catch (error) {
      console.error('Sohbetleri getirme hatası:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    
    // Giriş yapıldıktan sonra sohbetleri getir
    const token = localStorage.getItem('chatAppToken');
    if (token) {
      fetchConversations(token);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chatAppToken');
    localStorage.removeItem('chatAppUser');
    setIsLoggedIn(false);
    setUser(null);
    setConversations([]);
    setActiveChat(null);
  };

  // Yeni bir fonksiyon ekleyin - gönderilen mesajı yerel state'e kaydetmek için
  const updateLocalMessages = (chatId, newMessage) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === chatId) {
          // Sohbetteki mesajlar dizisi yoksa oluşturalım
          const messages = conv.messages || [];
          
          return {
            ...conv,
            messages: [...messages, newMessage],
            // Son mesaj bilgilerini de güncelleyelim
            lastMessage: {
              text: newMessage.text,
              sender: newMessage.sender,
              timestamp: new Date().toISOString()
            },
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      })
    );
  };

  // sendMessage fonksiyonunu güncelleyin
  const sendMessage = async (chatId, messageText) => {
    try {
      const token = localStorage.getItem('chatAppToken');
      
      // Önce yerel mesaj objesi oluştur
      const newMessage = {
        id: `temp-${Date.now()}`,
        sender: user.id,
        text: messageText,
        timestamp: new Date().toISOString()
      };
      
      // Yerel state'i güncelle
      updateLocalMessages(chatId, newMessage);
      
      // Sonra API'ye gönder
      const response = await fetch(`http://localhost:5000/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: messageText })
      });
      
      if (!response.ok) {
        throw new Error('Mesaj gönderilirken bir hata oluştu');
      }
      
      const sentMessage = await response.json();
      
      // Temp mesajı gerçek ID ile güncelle
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === chatId) {
            return {
              ...conv,
              messages: conv.messages.map(msg => 
                msg.id === newMessage.id ? {...msg, id: sentMessage.id} : msg
              )
            };
          }
          return conv;
        })
      );
      
      return sentMessage;
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin"></i>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Backend'den veri alamadıysak mock veriyi kullan
  const useConversations = conversations.length > 0 ? conversations : [
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

  const activeChatData = useConversations.find(chat => chat.id === activeChat);

  return (
    <div className="app">
      <ChatList 
        conversations={useConversations} 
        activeChat={activeChat} 
        setActiveChat={setActiveChat}
        user={user}
        onLogout={handleLogout}
      />
      <ChatWindow 
        activeChat={activeChat} 
        chatData={activeChatData}
        user={user}
        sendMessage={sendMessage} // Bu prop'u geçtiğinizden emin olun
      />
    </div>
  );
}

export default App;