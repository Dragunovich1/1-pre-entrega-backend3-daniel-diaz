// /routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authJWTMiddleware } = require('../middlewares/authMiddleware');

// Rutas para productos
router.get('/', productController.getAllProducts);
router.post('/', authJWTMiddleware('admin'), productController.createProduct);
router.put('/:id', authJWTMiddleware('admin'), productController.updateProduct);
router.delete('/:id', authJWTMiddleware('admin'), productController.deleteProduct);

module.exports = router;
