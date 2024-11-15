// /routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authSessionMiddleware } = require('../middlewares/authMiddleware');

// Rutas para productos
router.get('/', productController.getAllProducts);
router.post('/', authSessionMiddleware(['admin']), productController.createProduct);
router.put('/:id', authSessionMiddleware(['admin']), productController.updateProduct);
router.delete('/:id', authSessionMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
