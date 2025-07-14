const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');
const { verifyToken } = require('./middleware/auth');

// Environment variables
dotenv.config();

// MongoDB bağlantısını başlat
connectDB();

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/chats', verifyToken, chatRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('ChatApp API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});