const express = require('express')
const oauthClientController = require("../controller/oauthClientController");
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateClientResponseDTO:
 *       type: object
 *       required:
 *         - clientId
 *         - clientSecret
 *         - grants
 *         - redirectUris
 *       properties:
 *         clientId:
 *           type: string
 *           description: Client Id
 *         clientSecret:
 *           type: string
 *           description: Client Secret
 *         grants:
 *           type: array
 *           description: grant types
 *           example: '["authorization_code","refresh_token"]'
 *         redirectUris:
 *           type: array
 *           description: redirect uri
 */



/**
 * @swagger
 * /client/register:
 *   post:
 *     tags:
 *      - Create client
 *     summary: Create client
 *     operationId: createClient
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *               - clientName
 *               - redirectUri
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: Google
 *               redirectUri:
 *                 type: string
 *                 example: 'https://google.com'
 *     responses:
 *       '201':
 *         description: 'Client created'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateClientResponseDTO'
 *
 */

router.post('/register', oauthClientController.registerClient);

//TODO: Only developer account and admin account should have access to this
router.get('/me', oauthClientController.getClientInformation);

module.exports = router
