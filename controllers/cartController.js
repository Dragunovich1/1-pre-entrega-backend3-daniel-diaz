// /controllers/cartController.js
const CartRepository = require('../repositories/cartRepository');
const ProductRepository = require('../repositories/productRepository');
const Ticket = require('../models/ticketModel');

exports.addToCart = async (req, res) => {
  const userId = req.session.user.id;  // Obtenemos el ID del usuario logueado
  const productId = req.params.pid;

  try {
    let cart = await CartRepository.getCartByUser(userId);
    
    // Si no existe un carrito para el usuario, lo creamos
    if (!cart) {
      cart = await CartRepository.createCart(userId);
    }

    // Buscamos el producto
    const product = await ProductRepository.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificamos si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(item => item.product.equals(productId));
    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += 1;  // Incrementamos la cantidad
    } else {
      cart.products.push({ product: productId, quantity: 1 });  // Añadimos el producto
    }

    await cart.save();
    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error al agregar producto al carrito', error });
  }
};

// Otra función: completePurchase
exports.completePurchase = async (req, res) => {
  const cartId = req.params.cid;
  const user = req.session.user;

  try {
    const cart = await CartRepository.getCartById(cartId);
    let totalAmount = 0;
    let failedProducts = [];

    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product._id);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await product.save();
      } else {
        failedProducts.push(product._id);
      }
    }

    if (totalAmount > 0) {
      const ticket = new Ticket({
        amount: totalAmount,
        purchaser: user.email,
      });
      await ticket.save();
    }

    cart.products = cart.products.filter((item) => failedProducts.includes(item.product._id));
    await cart.save();

    res.json({
      message: 'Compra completada',
      failedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al completar la compra', error });
  }
};
