// /routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authSessionMiddleware } = require('../middlewares/authMiddleware');

// Ruta para agregar al carrito
router.post('/add/:pid', authSessionMiddleware(['user', 'admin']), cartController.addToCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', authSessionMiddleware(['user']), cartController.completePurchase);

module.exports = router;
