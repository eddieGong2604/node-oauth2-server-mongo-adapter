const express = require('express')
const oauthClientController = require("../controller/oauthClientController");
const router = express.Router();

router.post('/register', oauthClientController.registerClient);

router.get('/me', oauthClientController.getClientInformation);

module.exports = router
