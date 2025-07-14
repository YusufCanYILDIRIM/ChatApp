const mongoose = require('mongoose');

// MongoDB URI - yerel veritabanı veya MongoDB Atlas URL'si
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarılı');
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err.message);
    // Kritik bir hata olduğu için uygulamayı sonlandır
    process.exit(1);
  }
};

module.exports = connectDB;