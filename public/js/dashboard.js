// /public/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // Lógica para mostrar el modal de agregar productos
  document.querySelector('#add-product-btn').addEventListener('click', () => {
    document.querySelector('#add-product-modal').style.display = 'block';
  });

  // Lógica para cerrar el modal
  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('#add-product-modal').style.display = 'none';
  });

  // Lógica para enviar el formulario de agregar producto
  document.querySelector('#add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {};
    formData.forEach((value, key) => (productData[key] = value));

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Producto creado') {
          window.location.reload();
        }
      });
  });

  // Lógica para eliminar productos
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');

      fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Producto eliminado') {
            window.location.reload();
          }
        });
    });
  });

  // Lógica para agregar al carrito
  document.querySelectorAll('.add-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');

      // Hacemos una petición al servidor para agregar el producto al carrito
      fetch(`/api/carts/add/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }), // Podemos modificar la cantidad si lo necesitamos
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Producto agregado al carrito') {
            alert('Producto agregado al carrito correctamente');
          } else {
            alert('Error al agregar el producto al carrito');
          }
        })
        .catch((error) => {
          console.error('Error al agregar al carrito:', error);
          alert('Ocurrió un error al intentar agregar el producto al carrito.');
        });
    });
  });
});
