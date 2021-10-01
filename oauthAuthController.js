const oauthAuthService = require('./oauthAuthService');

const cashDUserOAuthLoginController = async (req, res) => {
    const userLoginDTO = req.body;
    try {
        const userId = oauthAuthService.cashDUserOAuthLoginService(userLoginDTO);
        if (userId) {
            req.session.user = {userId};
            req.session.client = {clientId: req.body.clientId};
        }
        res.status(200).json({success: true});
    } catch (e) {
        res.status(400).json({success: false});
    }

}

const allowMerchantsController = async (req, res, next) => {
    const allowMerchantDTO = req.body;
    const userId = req.session.user.userId;
    const clientId = req.session.client.clientId;
    const isAllowed = oauthAuthService.allowMerchantService(allowMerchantDTO, userId, clientId);
    if(isAllowed){
        next();
    }
}
module.exports = {cashDUserOAuthLoginController, allowMerchantsController};