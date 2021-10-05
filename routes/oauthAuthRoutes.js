const express = require('express')

const oauthAuthController = require('../controller/oauthAuthController');
const oauthServer = require('../config/oauth/oauthServer')
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponseDTO:
 *       type: object
 *       required:
 *         - success
 *       properties:
 *         success:
 *           type: boolean
 *           description: Login state
 *           example: true
 *     CreateTokenResponseDTO:
 *       type: object
 *       required:
 *         - access_token
 *         - token_type
 *         - expires_in
 *         - refresh_token
 *         - scope
 *       properties:
 *         access_token:
 *           type: string
 *         refresh_token:
 *           type: string
 *         token_type:
 *           type: string
 *         scope:
 *           type: string
 *           description: scopes of this token, separated by a comma
 *         expires_in:
 *           type: number
 *           description: Numeric Date after which  the token expires
 */



/**
 * @swagger
 * /oauth/login:
 *   post:
 *     tags:
 *      - Login
 *     summary: OAuth Login
 *     operationId: oauthLogin
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *               - username
 *               - password
 *               - clientId
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: google
 *               password:
 *                 type: string
 *                 example: 'google'
 *               clientId:
 *                 type: string
 *                 example: 'clientId'
 *     responses:
 *       '200':
 *         description: 'Login successful'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: connect.sid=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDTO'
 *
 */

router.post('/login', oauthAuthController.cashDUserOAuthLoginController);



/**
 * @swagger
 * /oauth/allow-merchants:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *      - Accept consent
 *     summary: OAuth Accept Consent
 *     operationId: acceptConsent
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *               - agreeConsent
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: clientId
 *               redirect_uri:
 *                 type: string
 *                 description: redirect uri if successful
 *               response_type:
 *                 type: string
 *                 example: 'code'
 *               grant_type:
 *                 type: string
 *                 example: 'authorization_code'
 *               state:
 *                 type: string
 *                 description: random string to prevent attack
 *                 example: 'abcde12345'
 *               agreeConsent:
 *                 type: boolean
 *                 description: whether user agrees with the consent
 *     responses:
 *       '302':
 *         description: 'Redirect to client redirect_uri'
 *         headers:
 *           Location:
 *             description:
 *               client redirect uri
 *             schema:
 *               type: string
 *               format: uri
 *             examples:
 *               RedirectUri:
 *                 description: redirect uri
 *                 example: 'https://google.com?code=abcde12345&state=abcde12345'
 *
 */


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






/**
 * @swagger
 * /oauth/token:
 *   post:
 *     tags:
 *      - Create/Refresh access_token
 *     summary: Create or refresh access token
 *     operationId: createRefreshAccessToken
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *               - client_id
 *               - client_secret
 *               - grant_type
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: clientId
 *               client_secret:
 *                 type: string
 *                 description: client secret
 *               grant_type:
 *                 type: string
 *                 description: either authorization_code or refresh_token
 *               code:
 *                 type: string
 *                 description: authorization code got from redirect_uri
 *                 example: 'authorization_code'
 *               refresh_token:
 *                 type: string
 *                 description: add refresh token to refresh access token (when grant_type is refresh_token)
 *     responses:
 *       '200':
 *         description: 'Access token is returned'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTokenResponseDTO'
 *
 */

router.post('/token', oauthServer.token({}));






module.exports = router
