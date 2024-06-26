const {Router} = require('express')
const {verifyToken} = require('../Middleware/authMiddleware')
const { saveCryptoPair } = require('../controllers/cryptoPairController')

const router = Router();
router.post('/savecryptopair', verifyToken, saveCryptoPair)

module.exports =router;