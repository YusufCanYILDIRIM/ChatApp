const express = require('express');
const { users } = require('../data/users');

const router = express.Router();

// Tüm kullanıcıları getir
router.get('/', (req, res) => {
  // Şifreleri gönderme
  const safeUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage
  }));
  
  res.status(200).json(safeUsers);
});

// Kullanıcı profili getir
router.get('/profile', (req, res) => {
  const user = users.find(user => user.id === req.userId);
  
  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
  }
  
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage
  });
});

module.exports = router;