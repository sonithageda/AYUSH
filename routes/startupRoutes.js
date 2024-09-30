const express = require('express');
const auth = require("../middleware/auth");
const startupController = require('../controllers/startupController');
const startupRouter = express.Router();

startupRouter.get('/', startupController.getApprovedStartups);
startupRouter.get('/dashboard', auth.auth, auth.startupAuth, startupController.getStartupDashboard);
startupRouter.put('/update-profile', auth.auth, auth.startupAuth, startupController.updateStartupProfile);

module.exports = startupRouter;