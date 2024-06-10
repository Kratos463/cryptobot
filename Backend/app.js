const express = require('express');
const app = express();


app.use(express.json());

// Import routes
const apiRoutes = require('./routes/api');

// Use routes
app.use('/api', apiRoutes);

module.exports = { app };
