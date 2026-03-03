const router = require('express').Router();
const authController = require('../controllers/authController'); // controlador de auth

// Rutas de autenticación
router.post('/login', authController.login);       // login de usuarios
router.post('/register', authController.register); // registro de usuarios

module.exports = router;