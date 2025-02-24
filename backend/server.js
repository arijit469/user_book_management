require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is imported
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://user-book-management11-82w5.vercel.app', // Allow frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


// Middleware
// const cors = require('cors');

// app.use(cors({
//   origin: ['https://user-book-management11-82w5.vercel.app'], // Allow your frontend
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true
// }));
// app.use(cors({
//   origin: ['https://user-book-management11-82w5.vercel.app'],  // Allow frontend
//   methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allow required HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
//   credentials: true
// }));

// Handle preflight requests manually (if needed)
// app.options('*', cors());

// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



