// Bu dosya basit bir veritabanı görevi görecek
// Gerçek projede MongoDB, MySQL gibi veritabanları kullanılmalı
const bcrypt = require('bcryptjs');

// Her başlangıçta yeni hashler oluştur - güvenilir olması için
console.log('Hashing passwords...');
const password123Hash = bcrypt.hashSync('password123', 10);
const demo123Hash = bcrypt.hashSync('demo123', 10);
console.log('Password hash:', password123Hash);
console.log('Demo hash:', demo123Hash);

const users = [
  {
    id: "1",
    name: "Test Kullanıcı",
    email: "test@example.com",
    password: password123Hash, // Her çalışmada yeniden hashlenecek
    profileImage: null,
    createdAt: "2025-07-14T10:00:00Z"
  },
  {
    id: "2",
    name: "Demo User",
    email: "demo@example.com",
    password: demo123Hash, // Her çalışmada yeniden hashlenecek
    profileImage: null,
    createdAt: "2025-07-14T10:00:00Z"
  }
];

console.log('Users loaded:', users.length);
console.log('Ready for authentication tests');

module.exports = { users };