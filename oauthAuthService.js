const oauthRepository = require('./oauthRepository');
const READ_WALLET_SCOPE = require("./oauthConstants");
const WRITE_WALLET_SCOPE = require("./oauthConstants");

const cashDUserOAuthLoginService = async (userLoginDTO) => {
    //TODO: we should also take care of the encryption of password
    const user = await oauthRepository.OAuthUsersModel.findOne({
        username: userLoginDTO.username,
        password: userLoginDTO.password
    }).exec();
    if (user) {
        return user._id;
    } else {
        throw new Error("Login failed");
    }

}

const allowMerchantService = async (allowMerchantDTO, userId, clientId) => {
    const isAgreed = allowMerchantDTO.isAgreed || false;
    if(!userId || !clientId){
        return false;
    }
    if (isAgreed) {
        //In the future maybe different types of clients may require different scope
        //For now, only read and write access to wallet scopes are available

        // Save scope of the pair of clientId and userId
        await oauthRepository.OAuthScopes.create({
            clientId: clientId,
            userId: userId,
            scope: READ_WALLET_SCOPE + "," + WRITE_WALLET_SCOPE
        });
        return true;
    } else {
        return false;
    }
}

module.exports = {cashDUserOAuthLoginService, allowMerchantService};