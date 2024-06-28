const { Router } = require('express');
const { generateSecret,
    verify_otp, } = require('../controllers/kycController');
const { verifyToken } = require('../Middleware/authMiddleware')



const router = Router();

router.post('/2fa_generate_secret', verifyToken, generateSecret)
router.post('/2fa_verify', verifyToken,verify_otp)

module.exports = router;