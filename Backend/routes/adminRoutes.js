const {Router} = require('express');
const {AdminLogin} = require('../controllers/Admin_Controllers/LoginController');
const {add_Plan,getPlans}= require('../controllers/Admin_Controllers/subcriptionController');

const router = Router();
router.post('/login',AdminLogin);
router.post('/add_subscription',add_Plan)
router.get('/fetch_subcriptionPlans',getPlans)

module.exports = router