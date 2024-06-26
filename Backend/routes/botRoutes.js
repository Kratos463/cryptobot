const {Router}= require('express');
const {verifyToken}= require('../Middleware/authMiddleware')
const {CreateBot,
    getBots,} = require('../controllers/botController')

const router = Router();
router.post('/createbot',verifyToken,CreateBot)
router.get('/mybots',verifyToken,getBots)

module.exports =router;