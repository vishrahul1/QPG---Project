const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const uploadRoute = require('./routes/uploadRoute'); 

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for forms

// Add this route after any middleware
app.use('/api', uploadRoute); 

// Test route
app.get('/', (req, res) => {
  res.send('🚀 QPG API is Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
