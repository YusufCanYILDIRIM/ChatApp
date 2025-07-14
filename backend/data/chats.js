// Bu dosya basit bir veritabanı görevi görecek
// Gerçek projede MongoDB, MySQL gibi veritabanları kullanılmalı
const chats = [
  {
    id: "1",
    participants: ["1", "3"], // Test Kullanıcı ve Ahmet Yılmaz
    messages: [
      { 
        id: "msg1", 
        sender: "3", 
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
  },
  {
    id: "2",
    participants: ["2", "4"], // Demo User ve Ayşe Demir
    messages: [
      { 
        id: "msg3", 
        sender: "4", 
        text: "Merhaba Demo, proje nasıl gidiyor?", 
        timestamp: "2025-07-14T15:30:00Z" 
      },
      { 
        id: "msg4", 
        sender: "2", 
        text: "Gayet iyi, teşekkürler!", 
        timestamp: "2025-07-14T15:35:00Z" 
      }
    ],
    createdAt: "2025-07-14T15:30:00Z",
    updatedAt: "2025-07-14T15:35:00Z"
  },
  {
    id: "3",
    participants: ["1", "4"], // Test Kullanıcı ve Ayşe Demir
    messages: [
      { 
        id: "msg5", 
        sender: "4", 
        text: "Toplantı saat kaçta?", 
        timestamp: "2025-07-14T16:10:00Z" 
      },
      { 
        id: "msg6", 
        sender: "1", 
        text: "15:00'de başlayacak", 
        timestamp: "2025-07-14T16:12:00Z" 
      }
    ],
    createdAt: "2025-07-14T16:10:00Z",
    updatedAt: "2025-07-14T16:12:00Z"
  }
];

module.exports = { chats };