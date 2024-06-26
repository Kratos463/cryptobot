const {Router} = require('express');
const {verifyToken} = require('../Middleware/authMiddleware')
const {handleWebhook} = require('../controllers/tradeController')

const router = Router();

router.post('/:userId/:botId',handleWebhook)

module.exports = router;