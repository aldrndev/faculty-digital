const express = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/login', userController.login);
router.get('/product', authenticate, productController.fetchProduct);

module.exports = router;
