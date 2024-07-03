const {Router} = require('express');
const {verifyToken} = require('../Middleware/authMiddleware')
const {handleWebhook} = require('../controllers/tradeController')

const router = Router();

router.post('/:shortId',handleWebhook);

module.exports = router;