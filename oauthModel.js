const oauthDB = require("./oauthRepository");


module.exports = {
    getClient: async (clientId, clientSecret) => {
        console.log(clientId, clientSecret);
        const client = await oauthDB.OAuthClientsModel.findOne({clientId: clientId, clientSecret: clientSecret}).exec();
        const result = {
            clientId: client.clientId,
            clientSecret: client.clientSecret,
            grants: ['authorization_code', 'refresh_token'],
            redirectUris: ['https://google.com']
        }
        return new Promise(resolve => {
            resolve(result);
        })
    },
    generateAccessToken: (client, user, scope) => { // generates access tokens
        return new Promise(resolve => resolve("access_token"));
    },
    saveToken: async (token, client, user) => {
        console.log(client, user, token);
        const oauthToken = await oauthDB.OAuthTokensModel.create({
            accessToken: token.accessToken,
            accessTokenExpiresOn: token.accessTokenExpiresOn,

        });
        return new Promise(resolve => resolve("access_token"));

    },
    getAccessToken: token => {
        console.log(token);

        return new Promise(resolve => resolve("access_token"))
    },
    getRefreshToken: token => {
        console.log(token);

        return new Promise(resolve => resolve("refresh_token"))
    },
    revokeToken: token => {
        console.log(token);

        return new Promise(resolve => resolve(true))
    },
    saveAuthorizationCode: async (code, client, user) => {
        const authCode = await oauthDB.OAuthAuthorizationCodes.create({
            authorizationCode : code.authorizationCode,
            expiresAt: code.expiresAt,
            redirectUri: code.redirectUri,
            user: user,
            client: client
        });
        const result = {
            authorizationCode: authCode.authorizationCode,
            expiresAt: authCode.expiresAt,
            client: client,
            user: user,
        }
        return new Promise(resolve => resolve(Object.assign({
            redirectUri: `${code.redirectUri}`,
        }, result)))
    },
    getAuthorizationCode: async authorizationCode => {
        const authCode = await oauthDB.OAuthAuthorizationCodes.findOne({
            authorizationCode : authorizationCode.authorizationCode
        }).exec();
        const result = {
            authorizationCode: authCode.authorizationCode,
            expiresAt: authCode.expiresAt,
            client: authCode.client,
            user: authCode.user,
        }
        return new Promise(resolve => {
            resolve(result)
        })
    },
    revokeAuthorizationCode: async authorizationCode => {
        let codeFoundAndDeleted;
        try{
            await oauthDB.OAuthAuthorizationCodes.deleteOne({
                authorizationCode: authorizationCode.code
            });
            codeFoundAndDeleted = true;
        }
        catch (e){
           codeFoundAndDeleted = false;
        }
        return new Promise(resolve => resolve(codeFoundAndDeleted))
    },
    verifyScope: (token, scope) => {
        console.log(token, scope);
        return new Promise(resolve => resolve(false))
    }
}
