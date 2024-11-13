// /repositories/cartRepository.js

const CartDAO = require('../daos/cartDao');

class CartRepository {
  async getCartById(cartId) {
    return await CartDAO.getCartById(cartId);
  }

  async getCartByUser(userId) {
    return await CartDAO.getCartByUser(userId);
  }

  async createCart(cartData) {
    return await CartDAO.createCart(cartData);
  }

  async updateCart(cartId, cartData) {
    return await CartDAO.updateCart(cartId, cartData);
  }
}

module.exports = new CartRepository();
