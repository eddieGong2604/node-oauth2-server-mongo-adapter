const express = require('express')
const oauthClientController = require("../controller/oauthClientController");
const router = express.Router();

router.post('/register', oauthClientController.registerClient);

//TODO: Only developer account and admin account should have access to this
router.get('/me', oauthClientController.getClientInformation);

module.exports = router
