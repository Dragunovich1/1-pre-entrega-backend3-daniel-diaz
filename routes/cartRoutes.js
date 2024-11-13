// /routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authJWTMiddleware } = require('../middlewares/authMiddleware');



// Ruta para finalizar la compra
router.post('/:cid/purchase', authJWTMiddleware('user'), cartController.completePurchase);

module.exports = router;
