const {Router} = require('express');
const {verifyToken} = require('../helpers/userhelper')
const {registerUser,
       verifyEmail,
       Emailverification,
       checkEmail,
       loginUser,
       userData,
}= require('../controllers/userController')

const router = Router();
   
router.post('/send-verification-email',Emailverification)
router.post('/check-email-verification',checkEmail)
router.get('/verify-email',verifyEmail)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/user',verifyToken,userData)



module.exports = router;