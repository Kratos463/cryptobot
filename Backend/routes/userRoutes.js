const {Router} = require('express');
const {registerUser,
       verifyEmail,
}= require('../controllers/userController')

const router = Router();


router.post('/register',registerUser)
router.get('/verify-email',verifyEmail)



module.exports = router;