const {Router} = require('express');
const {verifyToken} =require('../Middleware/authMiddleware')
const {getAccountBalance} = require('../controllers/accountController')

const router = Router();

router.post('/walletbalance',verifyToken,getAccountBalance)

module.exports = router;

