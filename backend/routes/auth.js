const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/users');

const router = express.Router();

// Kayıt ol
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Register attempt:', email);
    
    // Email kontrol
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor!" });
    }
    
    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');
    
    // Yeni kullanıcı
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      profileImage: null,
      createdAt: new Date().toISOString()
    };
    
    // Kullanıcıyı kaydet
    users.push(newUser);
    console.log('User added:', newUser.id);
    
    // Token oluştur
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );
    console.log('Token created');
    
    res.status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profileImage: newUser.profileImage
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

// Giriş yap
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received');
    const { email, password } = req.body;
    console.log('Login attempt for:', email);
    
    // Kullanıcıyı bul
    const user = users.find(user => user.email === email);
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    console.log('User found:', user.id);
    
    // Şifreyi kontrol et
    console.log('Comparing password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz şifre!" });
    }
    
    // Token oluştur
    console.log('Creating token with secret:', process.env.JWT_SECRET ? 'Secret exists' : 'No secret!');
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );
    
    console.log('Login successful, token created');
    res.status(200).json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

// Token kontrol
router.post('/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Verifying token:', token ? 'Token exists' : 'No token');
  
  if (!token) {
    return res.status(403).json({ valid: false });
  }
  
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback_secret_key'
    );
    console.log('Token valid, user:', decoded.id);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ valid: false });
  }
});

module.exports = router;