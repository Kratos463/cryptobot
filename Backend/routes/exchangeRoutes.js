const {Router} = require('express');
const {verifyToken}= require('../Middleware/authMiddleware')
const { Apikeysave,
        getApiconfig} = require('../controllers/exchangeconfigController')
const {GetExchanges} = require('../controllers/exchangeController')
const router = Router();
router.post('/exchangeconfiguration', verifyToken, Apikeysave)
router.get('/myexchanges',verifyToken,GetExchanges)

module.exports = router;