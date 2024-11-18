// /routes/mocks.router.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Pet = require('../models/petModel');
const CustomError = require('../utils/errorHandler'); // Asegurarse de que el módulo existe correctamente
const generateUsers = require('../utils/userMockGenerator');

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: API para la generación de datos ficticios
 */

// Endpoint para generar mascotas ficticias
router.get('/mockingpets', (req, res) => {
  try {
    const pets = [];
    for (let i = 0; i < 100; i++) {
      pets.push({
        name: faker.animal.dog(),
        type: 'dog',
        breed: faker.animal.dog(), // Añadir 'breed' que es requerido por el modelo
        age: faker.number.int({ min: 1, max: 15 }),
        adopted: false,
        owner: null,
      });
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error al generar mascotas ficticias', error });
  }
});

// Endpoint para generar usuarios ficticios
router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateUsers(50);

    // Simular el formato de una respuesta Mongo agregando un _id
    const usersWithId = users.map(user => ({
      ...user,
      _id: faker.database.mongodbObjectId(),
    }));

    res.status(200).json(usersWithId);
  } catch (error) {
    res.status(500).json({ message: 'Error al generar usuarios ficticios', error });
  }
});

// Endpoint para generar datos e insertarlos en la base de datos
router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;
    const newUsers = [];
    const newPets = [];

    // Generar usuarios
    for (let i = 0; i < users; i++) {
      newUsers.push(
        new User({
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          email: faker.internet.email(),
          password: await bcrypt.hash('coder123', 10),
          role: faker.helpers.arrayElement(['user', 'admin']),
          age: faker.number.int({ min: 18, max: 70 }), // Añadir la edad aquí también
          pets: [],
        })
      );
    }

    // Generar mascotas
    for (let i = 0; i < pets; i++) {
      newPets.push(
        new Pet({
          name: faker.animal.dog(),
          type: 'dog',
          breed: faker.animal.dog(), // Añadir 'breed' que es requerido por el modelo
          age: faker.number.int({ min: 1, max: 15 }),
          adopted: false,
          owner: null,
        })
      );
    }

    // Guardar en la base de datos
    await User.insertMany(newUsers);
    await Pet.insertMany(newPets);

    res.status(201).json({ message: 'Datos generados e insertados en la base de datos' });
  } catch (error) {
    console.error('Error al generar datos:', error); // Imprimir el error para depuración
    res.status(500).json({ message: 'Error al generar e insertar datos', error });
  }
});

// Endpoint para generar usuarios ficticios según el número indicado
router.post('/generateUsers', async (req, res) => {
  try {
    const { users } = req.body; // Obtenemos la cantidad de usuarios desde la solicitud

    if (!users || users <= 0) {
      return res.status(400).json({ message: 'Debe proporcionar un número válido de usuarios.' });
    }

    const generatedUsers = [];

    for (let i = 0; i < users; i++) {
      generatedUsers.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('coder123', 10),
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [],
      });
    }

    res.status(200).json(generatedUsers); // Devolvemos los usuarios generados
  } catch (error) {
    res.status(500).json({ message: 'Error al generar usuarios', error });
  }
});

module.exports = router;
