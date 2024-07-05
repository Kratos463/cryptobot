const {Router} = require('express');
const {AdminLogin} = require('../controllers/Admin_Controllers/LoginController')

const router = Router();
router.post('/login',AdminLogin);

module.exports=router