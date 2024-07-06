const {Router} = require('express');
const {AdminLogin} = require('../controllers/Admin_Controllers/LoginController');
const {add_Plan}= require('../controllers/Admin_Controllers/subcriptionController');

const router = Router();
router.post('/login',AdminLogin);
router.post('/add_subcription',add_Plan)

module.exports = router