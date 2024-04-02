const express = require('express');
const router = express.Router();
const teamControllers = require('../controllers/teamControllers');

router.post('/team', teamControllers.createTeam);

router.get('/team/:id', teamControllers.getTeamById);

module.exports = router;