const {Router} = require('express');
const {AdminLogin} = require('../controllers/Admin_Controllers/LoginController');
const {add_Plan,
    getPlans,
    DeletePlan,
    GetplanById,
    update_Plan}= require('../controllers/Admin_Controllers/subcriptionController');

const router = Router();
router.post('/login',AdminLogin);

// -----subcription routes---------
router.post('/add_subscription',add_Plan)
router.get('/fetch_subcriptionPlans',getPlans)
router.delete('/delete_plan/:planId',DeletePlan)
router.get('/get_plan/:id',GetplanById)
router.put('/update_plan/:id',update_Plan)

module.exports = router