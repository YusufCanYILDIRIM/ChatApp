const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Middleware checking token:', token ? 'Token exists' : 'No token');
  
  if (!token) {
    return res.status(403).json({ message: "Token gerekli!" });
  }
  
  try {
    // Fallback secret key ekleyelim
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback_secret_key'
    );
    console.log('Token verified, user ID:', decoded.id);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: "Geçersiz token!" });
  }
};

module.exports = { verifyToken };