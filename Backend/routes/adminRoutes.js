const { Router } = require('express');
const { AdminLogin } = require('../controllers/Admin_Controllers/LoginController');
const { 
    add_Plan,
    getPlans,
    DeletePlan,
    GetplanById,
    update_Plan,
    updatePlanStatus,
    getPlansActive } = require('../controllers/Admin_Controllers/subcriptionController');

const { 
    createExchange,
    getExchange,
    DeleteExchange,
    getExchangeById,
    Edit_exchange,
    updateExchangeStatus,
    getActiveExchanges } = require('../controllers/Admin_Controllers/ExchangeController')
const {UserList,Block_user} = require('../controllers/Admin_Controllers/userController')

const router = Router();

router.post('/login', AdminLogin);

// -----subcription routes---------
router.post('/add_subscription', add_Plan)
router.get('/fetch_subcriptionPlans', getPlans)
router.delete('/delete_plan/:planId', DeletePlan)
router.get('/get_plan/:id', GetplanById)
router.put('/update_plan/:id', update_Plan)
router.put('/update_plan_status/:id', updatePlanStatus)
router.get('/get_subcriptionplans', getPlansActive)

//-------Exchange Routes -----------
router.post('/create_exchange', createExchange);
router.get('/get_exchange', getExchange);
router.delete('/delete_exchange/:id', DeleteExchange);
router.get('/get_exchange/:id', getExchangeById);
router.put('/Edit_exchange', Edit_exchange);
router.put('/update_exchange_status/:id', updateExchangeStatus);
router.get('/get_exchanges',getActiveExchanges);

// -----------user Routes----------------
router.get('/users',UserList);
router.put('/block_user/:id',Block_user)


module.exports = router