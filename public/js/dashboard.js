document.addEventListener('DOMContentLoaded', () => {
  // Lógica para mostrar el modal de agregar productos
  document.querySelector('#add-product-btn').addEventListener('click', () => {
    document.querySelector('#add-product-modal').style.display = 'block';
  });

  // Lógica para cerrar los modales
  document.querySelectorAll('.close').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      closeBtn.parentElement.parentElement.style.display = 'none';
    });
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

  // Lógica para abrir el modal de edición con datos precargados
  document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      const productTitle = button.getAttribute('data-title');
      const productDescription = button.getAttribute('data-description');
      const productCode = button.getAttribute('data-code');
      const productPrice = button.getAttribute('data-price');
      const productCategory = button.getAttribute('data-category');
      const productStock = button.getAttribute('data-stock');

      // Precargar valores en el formulario de edición
      document.querySelector('#edit-id').value = productId;
      document.querySelector('#edit-title').value = productTitle;
      document.querySelector('#edit-description').value = productDescription;
      document.querySelector('#edit-code').value = productCode;
      document.querySelector('#edit-price').value = productPrice;
      document.querySelector('#edit-category').value = productCategory;
      document.querySelector('#edit-stock').value = productStock;

      // Mostrar el modal de edición
      document.querySelector('#edit-product-modal').style.display = 'block';
    });
  });

  // Lógica para enviar el formulario de editar producto
  document.querySelector('#edit-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = document.querySelector('#edit-id').value;
    const formData = new FormData(e.target);
    const productData = {};
    formData.forEach((value, key) => (productData[key] = value));

    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Producto actualizado') {
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

  // Función para mostrar alertas de CSS
  function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertElement = document.createElement('div');

    alertElement.className = `alert alert-${type}`;
    alertElement.innerText = message;

    alertContainer.appendChild(alertElement);

    setTimeout(() => {
      alertElement.remove();
    }, 5000);
  }

  // Lógica para agregar al carrito
  document.querySelectorAll('.add-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');

      fetch(`/api/carts/add/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Producto agregado al carrito') {
            showAlert('Producto agregado al carrito correctamente', 'success');
          } else {
            showAlert('Error al agregar el producto al carrito', 'error');
          }
        })
        .catch((error) => {
          console.error('Error al agregar al carrito:', error);
          showAlert('Ocurrió un error al intentar agregar el producto al carrito', 'error');
        });
    });
  });
});
