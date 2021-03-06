/**
 * Module dependencies.
 */

const mongoose = require('../config/dbConfig');

const Schema = mongoose.Schema;
/**
 * Schema definitions.
 */

mongoose.model('OAuthScopes', new Schema({
    clientId: {type: String},
    userId: {type: String},
    scope: {type: String}
}));

mongoose.model('OAuthTokens', new Schema({
    accessToken: {type: String},
    accessTokenExpiresAt: {type: Date},
    client: {type: Object},
    refreshToken: {type: String},
    refreshTokenExpiresAt: {type: Date},
    user: {type: Object},
    scope: {type: String}
}));

mongoose.model('OAuthAuthorizationCodes', new Schema({
    authorizationCode: {type: String},
    expiresAt: {type: Date},
    client: {type: Object},
    user: {type: Object},
    scope: {type: String}
}))

mongoose.model('OAuthClients', new Schema({
    clientId: {type: String},
    clientName: {type: String},
    clientSecret: {type: String},
    redirectUris: {type: Array},
    grants: {type: Array}
}));

/***
 *
 * TODO: In case of CashD API Engine, OAuthUsers is the current User database
 * so the below OAuthUsers should not be implemented in CashD actual app
 * */

mongoose.model('OAuthUsers', new Schema({
    password: {type: String},
    username: {type: String}
}));

const OAuthTokensModel = mongoose.model('OAuthTokens');
const OAuthClientsModel = mongoose.model('OAuthClients');
const OAuthUsersModel = mongoose.model('OAuthUsers');
const OAuthAuthorizationCodes = mongoose.model('OAuthAuthorizationCodes');
const OAuthScopes = mongoose.model('OAuthScopes');

module.exports = {OAuthTokensModel, OAuthScopes, OAuthClientsModel, OAuthUsersModel, OAuthAuthorizationCodes};