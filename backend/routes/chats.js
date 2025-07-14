const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { chats } = require('../data/chats');
const { users } = require('../data/users');

const router = express.Router();

// Kullanıcının tüm sohbetlerini getir
router.get('/', (req, res) => {
  const userId = req.userId;
  
  // Kullanıcının katıldığı sohbetler
  const userChats = chats.filter(chat => 
    chat.participants.includes(userId)
  );
  
  // Her sohbetin son mesajını ve diğer kullanıcı bilgisini ekle
  const formattedChats = userChats.map(chat => {
    // Sohbetteki diğer kullanıcı(lar)ı bul
    const otherParticipants = chat.participants
      .filter(id => id !== userId)
      .map(id => {
        const user = users.find(u => u.id === id);
        return user ? {
          id: user.id,
          name: user.name,
          profileImage: user.profileImage
        } : null;
      })
      .filter(Boolean);
      
    // Son mesaj
    const lastMessage = chat.messages.length > 0 
      ? chat.messages[chat.messages.length - 1] 
      : null;
      
    return {
      id: chat.id,
      participants: otherParticipants,
      lastMessage: lastMessage ? {
        text: lastMessage.text,
        sender: lastMessage.sender,
        timestamp: lastMessage.timestamp
      } : null,
      unreadCount: 0, // Bu özellik gerçek uygulamada hesaplanmalı
      updatedAt: chat.updatedAt
    };
  });
  
  res.status(200).json(formattedChats);
});

// Sohbet detaylarını getir
router.get('/:chatId', (req, res) => {
  const userId = req.userId;
  const chatId = req.params.chatId;
  
  const chat = chats.find(c => c.id === chatId);
  
  if (!chat) {
    return res.status(404).json({ message: "Sohbet bulunamadı!" });
  }
  
  // Kullanıcının bu sohbete erişim hakkı var mı?
  if (!chat.participants.includes(userId)) {
    return res.status(403).json({ message: "Bu sohbete erişim izniniz yok!" });
  }
  
  // Sohbetteki diğer kullanıcıları bul
  const otherParticipants = chat.participants
    .filter(id => id !== userId)
    .map(id => {
      const user = users.find(u => u.id === id);
      return user ? {
        id: user.id,
        name: user.name,
        profileImage: user.profileImage
      } : null;
    })
    .filter(Boolean);
  
  res.status(200).json({
    id: chat.id,
    participants: otherParticipants,
    messages: chat.messages,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt
  });
});

// Yeni mesaj gönder
router.post('/:chatId/messages', (req, res) => {
  const userId = req.userId;
  const chatId = req.params.chatId;
  const { text } = req.body;
  
  const chat = chats.find(c => c.id === chatId);
  
  if (!chat) {
    return res.status(404).json({ message: "Sohbet bulunamadı!" });
  }
  
  // Kullanıcının bu sohbete erişim hakkı var mı?
  if (!chat.participants.includes(userId)) {
    return res.status(403).json({ message: "Bu sohbete erişim izniniz yok!" });
  }
  
  // Yeni mesaj oluştur
  const newMessage = {
    id: uuidv4(),
    sender: userId,
    text,
    timestamp: new Date().toISOString()
  };
  
  // Mesajı ekle
  chat.messages.push(newMessage);
  chat.updatedAt = new Date().toISOString();
  
  res.status(201).json(newMessage);
});

module.exports = router;