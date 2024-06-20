const { Router } = require('express');
const { verifyToken } = require('../helpers/userhelper')
const { registerUser,
       verifyEmail,
       Emailverification,
       checkEmail,
       loginUser,
       userData,
       logout,
       updateUserProfile
} = require('../controllers/userController')

const {Apikeysave} = require('../controllers/exchangeconfigController')

const router = Router();

router.post('/send-verification-email', Emailverification)
router.post('/check-email-verification', checkEmail)
router.get('/verify-email', verifyEmail)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userData', verifyToken, userData)
router.post('/logout', logout)
router.put('/update_user/:id', updateUserProfile);

router.post('/exchangeconfiguration', verifyToken,Apikeysave)




module.exports = router;