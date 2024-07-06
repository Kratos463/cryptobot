const {Router} = require('express');
const {AdminLogin} = require('../controllers/Admin_Controllers/LoginController');
const {add_Plan,
    getPlans,
    DeletePlan}= require('../controllers/Admin_Controllers/subcriptionController');

const router = Router();
router.post('/login',AdminLogin);

// -----subcription routes---------
router.post('/add_subscription',add_Plan)
router.get('/fetch_subcriptionPlans',getPlans)
router.delete('/delete_plan/:planId',DeletePlan)

module.exports = router