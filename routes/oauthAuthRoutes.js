const express = require('express')

const oauthAuthController = require('../controller/oauthAuthController');
const oauthServer = require('../config/oauth/oauthServer')
const router = express.Router();
router.post('/login', oauthAuthController.cashDUserOAuthLoginController);
router.post('/allow-merchants', oauthAuthController.allowMerchantsController,
    (req, res, next) => {
        next();
    },
    oauthServer.authorize({
        authenticateHandler: {
            handle: req => {
                return req.session.user;
            }
        }
    })
);

module.exports = router
