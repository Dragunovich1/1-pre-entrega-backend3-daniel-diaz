// /routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const ProductRepository = require('../repositories/productRepository');
const CartRepository = require('../repositories/cartRepository');
const { authSessionMiddleware } = require('../middlewares/authMiddleware');

// Ruta principal del dashboard
router.get('/', authSessionMiddleware(), (req, res) => {
  if (req.session.user.role === 'admin') {
    res.redirect('/dashboard/products');
  } else {
    res.redirect('/dashboard/carts');
  }
});

// Ruta para la vista de productos del dashboard
router.get('/products', authSessionMiddleware('admin'), async (req, res) => {
  const products = await ProductRepository.getProducts();
  const productsData = products.map(product => product.toObject());
  res.render('dashboardProducts', {
    title: 'Gestión de Productos',
    products: productsData,
    user: req.session.user,
  });
});

// Ruta para la vista de carritos del dashboard
router.get('/carts', authSessionMiddleware(['user', 'admin']), async (req, res) => {
  const cart = await CartRepository.getCartByUser(req.session.user.id);
  res.render('dashboardCarts', {
    title: 'Mi Carrito',
    cart,
    user: req.session.user,
  });
});

module.exports = router;
