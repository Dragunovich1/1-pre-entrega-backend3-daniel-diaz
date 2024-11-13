// app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport'); // Importar configuración de Passport
const User = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Importar express-handlebars y configurar
const exphbs = require('express-handlebars');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Función para crear un usuario administrador si no existe
const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      admin = new User({
        first_name: 'Admin',
        last_name: 'User',
        email: adminEmail,
        password: hashedPassword,
        age: 30, // O la edad que prefieras
        role: 'admin', // Asegurarse de que el rol es 'admin'
      });
      await admin.save();
      console.log(`Usuario administrador creado con email: ${adminEmail}`);
    } else {
      console.log('Usuario administrador ya existe');
    }
  } catch (error) {
    console.error('Error creando el usuario admin:', error);
  }
};

// Conectar a MongoDB y luego iniciar el servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB');

    // Configuración de sesiones después de conectar a la base de datos
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false, // No volver a guardar la sesión si no ha cambiado
        saveUninitialized: false, // No guardar sesiones vacías
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        cookie: {
          maxAge: 1000 * 60 * 60, // Opcional: duración de la sesión (1 hora)
        },
      })
    );

    // Inicializar Passport y sesiones
    app.use(passport.initialize());
    app.use(passport.session());

    // Middleware para parsear JSON y URL-encoded
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Configuración del motor de plantillas Handlebars con partials y helpers
    const hbs = exphbs.create({
      defaultLayout: 'main',
      layoutsDir: path.join(__dirname, 'views/layouts'),
      partialsDir: path.join(__dirname, 'views/partials'),
      helpers: {
        multiply: (a, b) => a * b,
        eq: (a, b) => a === b,
        json: (context) => JSON.stringify(context, null, 2),
      },
    });

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));

    // Servir archivos estáticos
    app.use(express.static(path.join(__dirname, 'public')));

    // Rutas
    app.use('/auth', authRoutes);
    app.use('/dashboard', dashboardRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/carts', cartRoutes);

    // Ruta principal
    app.get('/', (req, res) => {
      res.redirect('/dashboard');
    });

    // Crear el usuario administrador
    await createAdminUser();

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });
