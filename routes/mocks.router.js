const express = require('express');
const router = express.Router();
const faker = require('faker'); // Utilizando faker versión 5.5.3
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Pet = require('../models/petModel');

// Endpoint para generar usuarios falsos
router.get('/mockingusers', (req, res) => {
  try {
    const users = [];

    for (let i = 0; i < 50; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('coder123', 10), // Contraseña encriptada
        role: faker.random.arrayElement(['user', 'admin']),
        pets: [],
      });
    }

    res.json(users);
  } catch (error) {
    console.error('Error al generar usuarios falsos:', error);
    res.status(500).json({ error: 'Error generando usuarios' });
  }
});

// Endpoint para generar usuarios y mascotas en la base de datos
router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ error: 'Faltan parámetros "users" y "pets"' });
    }

    const generatedUsers = [];
    console.log(`Generando ${users} usuarios...`);

    for (let i = 0; i < users; i++) {
      try {
        const newUser = new User({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync('coder123', 10), // Contraseña encriptada
          role: faker.random.arrayElement(['user', 'admin']),
          pets: [],
          age: faker.datatype.number({ min: 18, max: 65 }), // Generar una edad entre 18 y 65
        });

        const savedUser = await newUser.save();
        generatedUsers.push(savedUser);
        console.log(`Usuario ${savedUser.first_name} ${savedUser.last_name} generado y guardado correctamente.`);
      } catch (userError) {
        console.error('Error al guardar usuario:', userError);
      }
    }

    if (generatedUsers.length === 0) {
      console.error("No se generaron usuarios correctamente, no se procederá con la generación de mascotas.");
      return res.status(500).json({ error: 'No se generaron usuarios, no se pueden crear mascotas' });
    }

    const generatedPets = [];
    console.log(`Generando ${pets} mascotas...`);

    for (let i = 0; i < pets; i++) {
      try {
        const randomUser = faker.random.arrayElement(generatedUsers);

        if (!randomUser) {
          console.warn('No hay usuarios disponibles para asignar mascotas.');
          continue;
        }

        const newPet = new Pet({
          name: faker.name.firstName(),
          type: faker.animal.type(),
          age: faker.datatype.number({ min: 1, max: 15 }),
          breed: faker.animal.cat(), // Generar una raza para la mascota
          owner: randomUser._id, // Asignar una mascota a un usuario aleatorio
        });

        const savedPet = await newPet.save();
        generatedPets.push(savedPet);
        console.log(`Mascota ${savedPet.name} guardada correctamente, asignada al usuario ${randomUser.first_name} ${randomUser.last_name}`);
      } catch (petError) {
        console.error('Error al guardar mascota:', petError);
      }
    }

    res.json({ users: generatedUsers, pets: generatedPets });
  } catch (error) {
    console.error('Error al generar datos:', error);
    res.status(500).json({ error: 'Error generando datos' });
  }
});


module.exports = router;
