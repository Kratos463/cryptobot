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
const accountRoutes = require('./routes/accountRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes')
const cryptopairRoutes = require('./routes/cryptopairRoutes')
const botRoutes = require('./routes/botRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const kycRoutes = require('./routes/kycRoutes');
const adminRoutes = require('./routes/adminRoutes')

// Use routes
app.use('/', userRoutes);
app.use('/account', accountRoutes);
app.use('/exchange',exchangeRoutes);
app.use('/cryptopair',cryptopairRoutes);
app.use('/bot',botRoutes);
app.use('/webhook',tradeRoutes);
app.use('/kyc',kycRoutes);

// admin routes
app.use('/admin',adminRoutes)


module.exports = { app };
