const {Router} = require('express');
const {verifyToken}= require('../Middleware/authMiddleware')

const { Apikeysave,
        getApiconfig} = require('../controllers/exchangeconfigController')
const router = Router();
router.post('/exchangeconfiguration', verifyToken, Apikeysave)

module.exports = router;