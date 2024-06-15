const {Router} = require('express');
const {registerUser,
       verifyEmail,
       Emailverification,
       checkEmail,
}= require('../controllers/userController')

const router = Router();

router.post('/send-verification-email',Emailverification)
router.post('/check-email-verification',checkEmail)
router.get('/verify-email',verifyEmail)
router.post('/register',registerUser)



module.exports = router;