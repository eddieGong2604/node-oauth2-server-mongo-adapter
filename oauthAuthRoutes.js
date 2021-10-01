const express = require('express')

const oauthAuthController = require('./oauthAuthController');
const oauthServer = require('./oauthServer')
const router = express.Router();
router.post('/login', oauthAuthController.cashDUserOAuthLoginController);
router.post('/allow-merchants', oauthAuthController.allowMerchantsController,
    (req, res, next) => {
        next();
    },
    oauthServer.authorize({
        authenticateHandler: {
            handle: req => req.session.user
        }
    })
);

module.exports = router
