const {Router} = require('express');
const {registerUser}= require('../controllers/userController')

const router = Router();

router.post('/register')

router.get('/test', (req, res) => {
    res.send('API is working and MongoDB connection successful');
});

module.exports = router;
