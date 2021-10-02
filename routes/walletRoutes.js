const express = require('express')
const walletController = require("../controller/walletController");
const router = express.Router();
const SCOPE_CONSTANTS = require("../constants/oauthConstants")
const oauthServer = require('../config/oauth/oauthServer')

router.get('/info', oauthServer.authenticate({
    scope: SCOPE_CONSTANTS.READ_WALLET_SCOPE
}), walletController.getCashDWalletController);

module.exports = router
