const oauthRepository = require('../repository/oauthRepository');
const READ_WALLET_SCOPE = require("../constants/oauthConstants");
const WRITE_WALLET_SCOPE = require("../constants/oauthConstants");

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

const getMerchantScopeService = async (userId, clientId) => {
    //TODO: in the future there may be many kinds of scope
    return READ_WALLET_SCOPE + "," + WRITE_WALLET_SCOPE;
}

module.exports = {cashDUserOAuthLoginService, getMerchantScopeService};