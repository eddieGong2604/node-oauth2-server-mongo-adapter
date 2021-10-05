const oauthRepository = require("../repository/oauthRepository");
const uuid = require('uuid');
const {randomSecureASCIIString} = require("../utils/clientSecretUtil");
const {REFRESH_TOKEN_GRANT} = require("../constants/oauthConstants");
const {AUTHORIZATION_CODE_GRANT} = require("../constants/oauthConstants");

const getClientByClientIdService = async (client_id) => {
    return await oauthRepository.OAuthClientsModel.findOne({clientId: client_id}).exec();
}
const createClientService = async (createClientDTO) => {
    const client = await oauthRepository.OAuthClientsModel.create({
        clientId: uuid.v4(),
        clientSecret: randomSecureASCIIString(24),
        redirectUris: [createClientDTO.redirectUri],
        clientName: createClientDTO.clientName, //TODO: in real CashD App, we may need more information about the client than only clientName
        grants: [AUTHORIZATION_CODE_GRANT, REFRESH_TOKEN_GRANT]
    });
    return client;
}

module.exports = {createClientService, getClientByClientIdService};