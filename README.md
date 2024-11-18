##Primera Pre-entrega - CoderHouse - Backend 3

Alumno: Daniel Diaz

Comisión: 70060

Docente: Daniel Villajuan

Tutores: Juan Pablo Tuttolomondo, Federico Interlandi Zoireff, Ivan Passalia

## Descripción del Proyecto

Este proyecto es un servidor básico de e-commerce con dashboard desarrollado con Node.js y Express. Permite gestionar productos y carritos de compra, ofreciendo funcionalidades como la adición, eliminación y actualización de productos en tiempo real mediante WebSockets.

## Instalación

### Requisitos Previos

- Node.js v14 o superior
- MongoDB

### Pasos de Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Dragunovich1/proyecto-final-backend-daniel-diaz
   cd proyecto-final-backend-daniel-diaz
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Configurar la base de datos:

   Asegúrate de tener una instancia de MongoDB corriendo. Puedes usar la configuración por defecto en `mongodb://localhost:27017/base_de_datos` o modificar la configuración en `app.js`.

## Ejecución del Servidor

### Modo Desarrollo

Para ejecutar el servidor en modo desarrollo (con reinicio automático):

```bash
npm run dev
```

### Modo Producción

Para ejecutar el servidor en modo producción:

```bash
npm start
```

El servidor estará corriendo en [http://localhost:8080](http://localhost:8080).

### Usuario Administrador Predeterminado

Al arrancar el servidor, se genera un usuario administrador con las siguientes credenciales para realizar las pruebas:

- **Email**: `admin@example.com`
- **Password**: `adminpassword`

### Endpoints a Probar con Postman

## Pruebas con Postman - Generación de Datos

### Endpoints a Probar con Postman

#### GET /api/mocks/mockingusers

- **Objetivo**: Obtener una lista de 50 usuarios generados aleatoriamente usando Faker.
- **URL**: [http://localhost:8080/api/mocks/mockingusers](http://localhost:8080/api/mocks/mockingusers)
- **Tipo de Petición**: GET
- **Pasos para Probar**:
  1. Selecciona GET en Postman y prueba la URL mencionada.
  2. Verifica que obtienes una lista de 50 usuarios.

#### POST /api/mocks/generateData

- **Objetivo**: Generar e insertar en la base de datos la cantidad de usuarios y mascotas especificados.
- **URL**: [http://localhost:8080/api/mocks/generateData](http://localhost:8080/api/mocks/generateData)
- **Tipo de Petición**: POST
- **Headers**: `Content-Type: application/json`
- **Cuerpo**:
  ```json
  {
    "users": 10,
    "pets": 20
  }
  ```
- **Pasos para Probar**:
  1. Selecciona POST en Postman, agrega el JSON en el body y prueba la URL.
  2. Verifica que los datos se generen y guarden.

#### POST /api/mocks/generateUsers

- **Objetivo**: Generar usuarios ficticios según el número indicado.
- **URL**: [http://localhost:8080/api/mocks/generateUsers](http://localhost:8080/api/mocks/generateUsers)
- **Tipo de Petición**: POST
- **Headers**: `Content-Type: application/json`
- **Cuerpo**:
  ```json
  {
    "users": 15
  }
  ```
- **Pasos para Probar**:
  1. Selecciona POST en Postman, agrega el JSON en el body y prueba la URL.
  2. Verifica que obtienes la cantidad de usuarios solicitados generados aleatoriamente.

#### GET /api/users

- **Objetivo**: Obtener todos los usuarios generados y almacenados en la base de datos.
- **URL**: [http://localhost:8080/api/users](http://localhost:8080/api/users)
- **Tipo de Petición**: GET
- **Pasos para Probar**:
  1. Selecciona GET en Postman y prueba la URL mencionada.
  2. Verifica que obtienes todos los usuarios almacenados.

#### GET /api/pets

- **Objetivo**: Obtener todas las mascotas generadas y almacenadas en la base de datos.
- **URL**: [http://localhost:8080/api/pets](http://localhost:8080/api/pets)
- **Tipo de Petición**: GET
- **Pasos para Probar**:
  1. Selecciona GET en Postman y prueba la URL mencionada.
  2. Verifica que obtienes todas las mascotas almacenadas.