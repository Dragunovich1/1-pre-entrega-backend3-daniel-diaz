# Proyecto Final - CoderHouse - Backend 3

Alumno: Daniel Diaz

Comisión: 70020

Docente: Luis Alejandro Mera

Tutores: Abigail Salas, Alexis Coronel

## Descripción del Proyecto

Este proyecto es un servidor básico de e-commerce desarrollado con Node.js y Express. Permite gestionar productos y carritos de compra, ofreciendo funcionalidades como la adición, eliminación y actualización de productos en tiempo real mediante WebSockets.

## Instalación

### Requisitos Previos

- Node.js v14 o superior
- MongoDB

### Pasos de Instalación

1. Clonar el repositorio:


   ```sh
   git clone https://github.com/Dragunovich1/proyecto-final-backend-daniel-diaz
   cd proyecto-final-backend-daniel-diaz
   ```

2. Instalar las dependencias:

   ```sh
   npm install
   ```

3. Configurar la base de datos:

   Asegúrate de tener una instancia de MongoDB corriendo. Puedes usar la configuración por defecto en `mongodb://localhost:27017/base_de_datos` o modificar la configuración en `app.js`.

## Ejecución del Servidor

### Modo Desarrollo

Para ejecutar el servidor en modo desarrollo (con reinicio automático):

   ```sh
   npm run dev
   ```

### Modo Producción

Para ejecutar el servidor en modo producción:

   ```sh
   npm start
   ```

El servidor estará corriendo en `http://localhost:8080`.

## Vistas

### Dashboard

- **URL**: `http://localhost:8080`
- **Descripción**: Muestra la lista de productos disponibles, permite acceder al resto de las vistas, se pueden realizar todas las pruebas desde aquí.

### Agregar/modificar/eliminar productos

- **URL**: `http://localhost:8080/realtimeproducts`
- **Descripción**: Muestra una lista de productos que se actualiza en tiempo real. Permite agregar, modificar y eliminar productos.

### Carrito de Compras

- **URL**: `http://localhost:8080/carts/:cid`
- **Descripción**: Muestra los productos en el carrito específico.

### Detalle de Producto

- **URL**: `http://localhost:8080/products/:pid`
- **Descripción**: Muestra los detalles de un producto específico y permite agregarlo al carrito.

## Instrucciones de Uso

1. Ejecutar el servidor según el modo elegido.
2. Acceder a las siguientes rutas desde el navegador:

   - `http://localhost:8080` para ver el dashboard con la lista de productos.
   - `http://localhost:8080/realtimeproducts` para gestionar productos en tiempo real.
   - `http://localhost:8080/carts/:cid` para ver y gestionar el carrito de compras.
   - `http://localhost:8080/products/:pid` para ver los detalles de un producto específico.

3. La interfaz gráfica del dashboard permite realizar todas las pruebas necesarias para gestionar productos y carritos.

4. Iniciar sesión con el siguiente usuario administrador para realizar las pruebas:

   - **Email**: `admin@example.com`
   - **Password**: `adminpassword`

## API y Pruebas Manuales

### Productos

1. **Obtener productos con filtros, paginación y ordenamientos**
   - **URL**: `GET /api/products`
   - **Params**:
     - `limit`: 10
     - `page`: 1
     - `sort`: `asc` o `desc`
     - `query`: (categoría deseada)
   - **Response**: Devuelve la estructura con paginación y productos.

2. **Agregar un nuevo producto**
   - **URL**: `POST /api/products`
   - **Body (JSON)**:
     ```json
     {
       "title": "Nuevo Producto",
       "description": "Descripción del producto",
       "code": "NP001",
       "price": 100,
       "stock": 50,
       "category": "Categoría",
       "status": true
     }
     ```
   - **Response**: Devuelve el producto creado.

3. **Obtener producto por ID**
   - **URL**: `GET /api/products/:pid`
   - **Response**: Devuelve el producto con el ID especificado.

4. **Actualizar un producto**
   - **URL**: `PUT /api/products/:pid`
   - **Body (JSON)**:
     ```json
     {
       "title": "Producto Actualizado",
       "description": "Descripción actualizada",
       "price": 120
     }
     ```
   - **Response**: Devuelve el producto actualizado.

5. **Eliminar un producto**
   - **URL**: `DELETE /api/products/:pid`
   - **Response**: Devuelve un mensaje de confirmación de eliminación.

### Carritos

1. **Crear un nuevo carrito**
   - **URL**: `POST /api/carts`
   - **Response**: Devuelve el carrito creado.

2. **Obtener carrito por ID**
   - **URL**: `GET /api/carts/:cid`
   - **Response**: Devuelve el carrito con el ID especificado.

3. **Agregar producto al carrito**
   - **URL**: `POST /api/carts/add/:pid`
   - **Response**: Devuelve el carrito con el producto añadido.

4. **Eliminar un producto del carrito**
   - **URL**: `DELETE /api/carts/:cid/products/:pid`
   - **Response**: Devuelve el carrito con el producto eliminado.

### Usuarios

1. **Registrar un usuario**
   - **URL**: `POST /api/auth/register`
   - **Body (JSON)**:
     ```json
     {
       "first_name": "Juan",
       "last_name": "Pérez",
       "email": "juan.perez@gmail.com",
       "age": 30,
       "password": "password123"
     }
     ```
   - **Response**: Devuelve el usuario creado.

2. **Iniciar sesión**
   - **URL**: `POST /api/auth/login`
   - **Body (JSON)**:
     ```json
     {
       "email": "juan.perez@gmail.com",
       "password": "password123"
     }
     ```
   - **Response**: Devuelve un token JWT si las credenciales son correctas.

3. **Obtener el usuario actual (basado en el JWT)**
   - **URL**: `GET /api/sessions/current`
   - **Response**: Devuelve los datos del usuario autenticado.

## Testing - Set de Pruebas

### Prueba de Autenticación
1. Iniciar sesión con el usuario administrador proporcionado.
2. Verificar que se redirige correctamente al dashboard.

### Pruebas de Productos
1. **Agregar un nuevo producto**: Desde el dashboard, añadir un producto y verificar que aparezca en la lista de productos.
2. **Modificar producto existente**: Editar un producto desde la vista de productos y comprobar los cambios.
3. **Eliminar un producto**: Eliminar un producto y verificar que desaparece de la lista.

### Pruebas de Carrito
1. **Agregar un producto al carrito**: Seleccionar un producto y agregarlo al carrito.
2. **Verificar carrito**: Acceder a la vista del carrito y confirmar que los productos agregados están presentes con la cantidad correcta.
3. **Finalizar compra**: Completar la compra y confirmar que el carrito se vacía.

### Pruebas de Rutas Protegidas
1. Intentar acceder al dashboard sin iniciar sesión. Verificar que redirige a la página de inicio de sesión.
2. Intentar eliminar un producto sin tener el rol de administrador. Verificar que la acción es rechazada.

### Pruebas de Integridad
1. **Crear y eliminar carritos**: Crear un carrito, agregar productos, y luego eliminar productos del carrito para confirmar el comportamiento esperado.
2. **Pruebas de sesion y seguridad**: Verificar que un usuario autenticado solo pueda ver y modificar sus propios recursos.

Para realizar estas pruebas, se recomienda utilizar herramientas como Postman, Insomnia o simplemente el navegador.

