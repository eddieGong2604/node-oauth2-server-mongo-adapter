const walletService = require('../service/walletService');

const getCashDWalletController = async (req, res) => {
    //TODO: make access_token JWT, which contains userId, scope, and somehow pass

    //that userId to this function to get wallet by userId
    console.log("GETTING WALLET INFO OF USER ID", "userId")
    const wallet = await walletService.getCashDWalletService("userId");
    res.status(200).json(wallet);
}

module.exports = {getCashDWalletController};