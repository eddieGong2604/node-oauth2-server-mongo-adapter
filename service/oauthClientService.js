const oauthRepository = require("../repository/oauthRepository");
const uuid = require('uuid');
const getClientByClientIdService = async (client_id) => {
    return await oauthRepository.OAuthClientsModel.findOne({clientId: client_id}).exec();
}
const createClientService = async (createClientDTO) => {
    const client = await oauthRepository.OAuthClientsModel.create({
        clientId: uuid.v4(),
        clientSecret: "secret", //TODO: research on how to generate a secure client_secret
        redirectUris: [createClientDTO.redirectUri],
        clientName: createClientDTO.clientName, //TODO: in real CashD App, we may need more information about the client than only clientName
        grants: ["authorization_code", "refresh_token"]
    });
    return client;
}

module.exports = {createClientService, getClientByClientIdService};