const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/users', userControllers.getAllUsers);

router.get('/users/:id', userControllers.getUserById);

router.post('/users', userControllers.createUser);

router.put('/users/:id', userControllers.updateUser);

router.delete('/users/:id', userControllers.deleteUser)

module.exports = router;
