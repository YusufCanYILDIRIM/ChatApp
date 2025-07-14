const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Kayıt ol
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Register attempt:', email);
    
    // Email kontrol
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor!" });
    }
    
    // Yeni kullanıcı oluştur (pre-save hook şifreyi otomatik hashleyecek)
    const newUser = new User({
      name,
      email,
      password
    });
    
    // Kullanıcıyı kaydet
    await newUser.save();
    console.log('User added:', newUser._id);
    
    // Token oluştur
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu",
      token,
      user: {
        id: newUser._id,
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
    const { email, password } = req.body;
    console.log('Login attempt for:', email);
    
    // Kullanıcıyı email ile bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    
    // Şifreyi kontrol et
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz şifre!" });
    }
    
    // Kullanıcıyı çevrimiçi yap ve son görülme zamanını güncelle
    user.isOnline = true;
    user.lastSeen = Date.now();
    await user.save();
    
    // Token oluştur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user._id,
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
router.post('/verify-token', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ valid: false });
  }
  
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback_secret_key'
    );
    
    // Kullanıcı hala veritabanında mevcut mu kontrol et
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ valid: false, message: "Kullanıcı bulunamadı" });
    }
    
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ valid: false });
  }
});

module.exports = router;