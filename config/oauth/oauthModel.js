const oauthDB = require("../../repository/oauthRepository");

module.exports = {
    getClient: async (clientId, clientSecret) => {
        console.log("GETTING CLIENT with clientId: " + clientId + " clientSecret: " + clientSecret);
        const client = await oauthDB.OAuthClientsModel.findOne({clientId: clientId}).exec();
        const result = {
            clientId: client.clientId,
            clientSecret: client.clientSecret,
            grants: client.grants,
            redirectUris: client.redirectUris
        }
        console.log(result);
        return new Promise(resolve => {
            resolve(result);
        })
    },
    generateAccessToken: (client, user, scope) => { // generates access tokens

    },
    saveToken: async (token, client, user) => {
        console.log("SAVING ACCESS TOKEN......");
        const oauthAccessToken = (await oauthDB.OAuthTokensModel.create({
            accessToken: token.accessToken,
            accessTokenExpiresOn: token.accessTokenExpiresOn,
            refreshToken: token.refreshToken, // NOTE this is only needed if you need refresh tokens down the line
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: client,
            user: user,
            scope: token.scope
        }));
        console.log(oauthAccessToken);
        return new Promise(resolve => resolve(oauthAccessToken));

    },
    getAccessToken: async token => {
        const oauthToken = await oauthDB.OAuthTokensModel.findOne({
            accessToken: token.accessToken
        });
        console.log("GETTING ACCESS TOKEN......");
        console.log(oauthToken);
        return new Promise(resolve => resolve(oauthToken));
    },
    getRefreshToken: async token => {
        const oauthToken = await oauthDB.OAuthTokensModel.findOne({
            refreshToken: token.refreshToken
        });
        console.log("GETTING REFRESH TOKEN......");
        console.log(oauthToken);
        return new Promise(resolve => resolve(oauthToken))
    },
    revokeToken: token => {

        return new Promise(resolve => resolve(true))
    },
    saveAuthorizationCode: async (code, client, user) => {
        const authCode = (await oauthDB.OAuthAuthorizationCodes.create({
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            user: user,
            client: client,
            scope: code.scope
        }));
        console.log("SAVING AUTHORIZATION_CODE......");
        authCode.redirectUri =  code.redirectUri;
        console.log(authCode);
        return new Promise(resolve => resolve(authCode))
    },
    getAuthorizationCode: async code => {
        const authCode = await oauthDB.OAuthAuthorizationCodes.findOne({
            authorizationCode: code.authorizationCode
        }).exec();
        console.log("GETTING AUTHORIZATION_CODE......");
        console.log(authCode);
        return new Promise(resolve => {
            resolve(authCode)
        })
    },
    revokeAuthorizationCode: async code => {
        let codeFoundAndDeleted;
        try {
            console.log("REVOKING AUTHORIZATION_CODE......");
            await oauthDB.OAuthAuthorizationCodes.deleteOne({
                authorizationCode: code.authorizationCode
            });
            codeFoundAndDeleted = true;
        } catch (e) {
            codeFoundAndDeleted = false;
        }
        return new Promise(resolve => resolve(codeFoundAndDeleted))
    },
    verifyScope: (token, scope) => {
        let tokenScopeSet = new Set(token.scope.split(","));
        let scopeToVerifySet = new Set(scope.split(","));
        console.log("VERIFYING SCOPE......");
        console.log("TOKEN SCOPE: ", tokenScopeSet);
        console.log("SCOPE TO VERIFY: ", scopeToVerifySet);

        if (tokenScopeSet.size !== scopeToVerifySet.size) {
            return new Promise(resolve => resolve(false))
        }
        for (let scope of tokenScopeSet) {
            if (scopeToVerifySet.has(scope)) {
                scopeToVerifySet.delete(scope);
            }
        }
        if (scopeToVerifySet.size === 0) {
            return new Promise(resolve => resolve(true));
        } else {
            return new Promise(resolve => resolve(false));
        }


    }
}
