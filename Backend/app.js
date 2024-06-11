const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/', userRoutes);

module.exports = { app };
