const express = require('express')

const oauthAuthController = require('../controller/oauthAuthController');
const oauthServer = require('../config/oauth/oauthServer')
const router = express.Router();
router.post('/login', oauthAuthController.cashDUserOAuthLoginController);
router.post('/token', oauthServer.token({}));

router.post('/allow-merchants', oauthAuthController.allowMerchantsController,
    oauthServer.authorize({
        authenticateHandler: {
            handle: req => {
                const user = req.session.user;
                // End of getting authorization_code session
                req.session.destroy();
                return user;
            }
        }
    })
);

module.exports = router
