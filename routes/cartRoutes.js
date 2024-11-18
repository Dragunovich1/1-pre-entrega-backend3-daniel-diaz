// /routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authSessionMiddleware } = require('../middlewares/authMiddleware');

// Ruta para agregar al carrito
router.post('/add/:pid', authSessionMiddleware(['user', 'admin']), cartController.addToCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', authSessionMiddleware(['user', 'admin']), cartController.completePurchase);

// Nueva Ruta para vaciar el carrito
router.post('/:cid/empty', authSessionMiddleware(['user', 'admin']), cartController.emptyCart);

module.exports = router;
