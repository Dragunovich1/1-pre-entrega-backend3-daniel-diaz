// /middlewares/authMiddleware.js

const passport = require('passport');

const authJWTMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      // Si el usuario está autenticado en la sesión
      if (roles.length && !roles.includes(req.session.user.role)) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
      }
      req.user = req.session.user; // Establecer el usuario en req.user
      return next();
    } else {
      // Si no hay sesión, usar Passport JWT
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(401).json({ message: 'No autenticado' });
        }
        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ message: 'Acceso no autorizado' });
        }
        req.user = user;
        next();
      })(req, res, next);
    }
  };
};

const authSessionMiddleware = (roles = []) => {
  return (req, res, next) => {
    console.log('Usuario en sesión:', req.session.user); // Para depuración
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.status(403).send('Acceso no autorizado');
    }
    next();
  };
};

module.exports = {
  authJWTMiddleware,
  authSessionMiddleware,
};
