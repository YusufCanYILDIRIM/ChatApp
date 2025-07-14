// Bu dosya basit bir veritabanı görevi görecek
// Gerçek projede MongoDB, MySQL gibi veritabanları kullanılmalı
const chats = [
  {
    id: "1",
    participants: ["1", "2"], // Kullanıcı ID'leri
    messages: [
      { 
        id: "msg1", 
        sender: "2", 
        text: "Merhaba, nasılsın?", 
        timestamp: "2025-07-14T14:20:00Z" 
      },
      { 
        id: "msg2", 
        sender: "1", 
        text: "İyiyim, sen nasılsın?", 
        timestamp: "2025-07-14T14:22:00Z" 
      }
    ],
    createdAt: "2025-07-14T14:20:00Z",
    updatedAt: "2025-07-14T14:22:00Z"
  }
];

module.exports = { chats };