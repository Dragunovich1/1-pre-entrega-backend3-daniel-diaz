// /public/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // Lógica para agregar productos
  const addProductBtn = document.querySelector('#add-product-btn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      const title = prompt('Nombre del producto');
      const description = prompt('Descripción del producto');
      const code = prompt('Código del producto');
      const price = parseFloat(prompt('Precio del producto'));
      const category = prompt('Categoría del producto');
      const stock = parseInt(prompt('Stock del producto'));

      fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, description, code, price, category, stock }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Producto creado') {
            window.location.reload();
          } else {
            alert('Error al crear el producto: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
    });
  }

  // Lógica para agregar productos al carrito
  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');

      fetch(`/api/carts/add/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Producto agregado al carrito') {
            alert('Producto agregado al carrito');
          } else {
            alert('Error al agregar el producto al carrito: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
    });
  });
});

  // Lógica para eliminar productos
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');

      fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Producto eliminado') {
            window.location.reload();
          } else {
            alert('Error al eliminar el producto: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
    });
  });
});
