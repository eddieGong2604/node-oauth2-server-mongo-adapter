const oauthClientService = require("../service/oauthClientService");
const registerClient = async (req, res) => {
    const createClientDTO = req.body;
    const newClient = await oauthClientService.createClientService(createClientDTO);
    res.status(201).json(newClient);
}
const getClientInformation = async (req, res) => {
    const client = await oauthClientService.getClientByClientIdService(req.client_id);
    res.status(200).json(client);
}

module.exports = {registerClient, getClientInformation};