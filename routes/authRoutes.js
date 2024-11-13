// /routes/authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
    });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
});

// Inicio de sesión
router.post('/login', (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).render('login', { message: info.message || 'Error al iniciar sesión' });
      }

      req.login(user, async (error) => {
        if (error) return next(error);

        // Establecer el usuario en la sesión
        req.session.user = {
          id: user._id,
          email: user.email,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name,
        };

        // Asegurar que la sesión se guarda antes de redirigir
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          // Redirigir al dashboard correspondiente
          const redirectUrl = user.role === 'admin' ? '/dashboard/products' : '/dashboard/carts';
          return res.redirect(redirectUrl);
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});



// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar sesión' });
      }
      res.redirect('/auth/login'); // Redirigir al login después de cerrar sesión
    });
  });
});

module.exports = router;
