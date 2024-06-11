const {Router} = require('express');
const {registerUser}= require('../controllers/userController')

const router = Router();


router.post('/register',registerUser)



module.exports = router;