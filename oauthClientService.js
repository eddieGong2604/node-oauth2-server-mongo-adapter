const oauthRepository = require("./oauthRepository");
const getClientByClientIdService = async (client_id) => {
    return await oauthRepository.OAuthClientsModel.findOne({clientId: client_id}).exec();
}

const createClientService = async (createClientDTO) => {
    return await oauthRepository.OAuthClientsModel.create({
        clientId: "client_id_1", //TODO: research on how to generate a secure client_id
        clientSecret: "client_secret_1", //TODO: research on how to generate a secure client_secret
        redirectUris: [createClientDTO.redirectUri],
        clientName: [createClientDTO.clientName], //TODO: in real CashD App, we may need more information about the client than only clientName
    });
}

module.exports = {createClientService, getClientByClientIdService};