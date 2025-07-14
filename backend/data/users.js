// Bu dosya basit bir veritabanı görevi görecek
// Gerçek projede MongoDB, MySQL gibi veritabanları kullanılmalı
const bcrypt = require('bcryptjs');

// Yeni bir hash oluştur - güvenli olması için
const password123Hash = bcrypt.hashSync('password123', 10);
console.log('New password hash:', password123Hash);

const users = [
  {
    id: "1",
    name: "Test Kullanıcı",
    email: "test@example.com",
    // Şifre: "password123"
    password: password123Hash, // Yeni ve taze bir hash ile değiştir
    profileImage: null,
    createdAt: "2025-07-14T10:00:00Z"
  },
  {
    id: "2",
    name: "Demo User",
    email: "demo@example.com",
    // Şifre: "demo123"
    password: bcrypt.hashSync('demo123', 10),
    profileImage: null,
    createdAt: "2025-07-14T10:00:00Z"
  }
];

module.exports = { users };