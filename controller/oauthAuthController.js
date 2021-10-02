const oauthAuthService = require('../service/oauthAuthService');

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
        res.status(401).json({success: false});
    }

}

const allowMerchantsController = async (req, res, next) => {
    if(!req.session.user){
        res.status(401).json({success: false, message: "Please login"});
    }
    if(!req.body.isAgreed){
        res.status(401).json({success: false, message: "User declined consent"});
    }
    const userId = req.session.user.userId;
    const clientId = req.session.client.clientId;
    req.body.scope = oauthAuthService.getMerchantScopeService(userId, clientId);
    next();
}
module.exports = {cashDUserOAuthLoginController, allowMerchantsController};