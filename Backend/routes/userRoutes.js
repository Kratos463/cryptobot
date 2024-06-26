const { Router } = require('express');
const {verifyToken}=require('../Middleware/authMiddleware')
const { registerUser,
       verifyEmail,
       Emailverification,
       checkEmail,
       loginUser,
       userData,
       logout,
       updateUserProfile} = require('../controllers/userController')

const router = Router();

router.post('/send-verification-email', Emailverification)
router.post('/check-email-verification', checkEmail)
router.get('/verify-email', verifyEmail)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userData', verifyToken, userData)
router.post('/logout', logout)
router.put('/update_user/:id', updateUserProfile);



module.exports = router;