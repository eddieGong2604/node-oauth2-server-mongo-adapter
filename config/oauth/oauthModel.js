const oauthDB = require("../../repository/oauthRepository");
const { JWT_SECRET, JWT_LIFETIME } = require('../../constants/oauthConstants')
const jwt = require('jsonwebtoken')

module.exports = {
    getClient: async (clientId, clientSecret) => {
        console.log("GETTING CLIENT with clientId: " + clientId);
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
    generateAccessToken: async (client, user, scope) => {
        console.log("GENERATING ACCESS TOKEN......")
        const token = await jwt.sign(
            {
                "scope":scope
            }, 
            JWT_SECRET,
            {
                expiresIn: JWT_LIFETIME
            }
        )
        
        console.log(`TOKEN: ${token}`)
        return token
        //TODO: Generate an access token using JWT
    },
    generateRefreshToken: async (client, user, scope) => {
        //TODO: Generate an refresh token using JWT
        console.log("GENERATING REFRESH TOKEN......")
        const token = await jwt.sign(
            {
                "scope":scope
            }, 
            JWT_SECRET,
            {
                expiresIn: JWT_LIFETIME
            }
        )
        
        console.log(`TOKEN: ${token}`)
        return token

    },
    saveToken: async (token, client, user) => {
        console.log("SAVING ACCESS TOKEN......", token);
        const oauthAccessToken = (await oauthDB.OAuthTokensModel.create({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: client,
            user: user,
            scope: token.scope
        }));
        const tokenToReturn = {
            accessToken: oauthAccessToken.accessToken,
            accessTokenExpiresAt: oauthAccessToken.accessTokenExpiresAt,
            refreshToken: oauthAccessToken.refreshToken,
            refreshTokenExpiresAt: oauthAccessToken.refreshTokenExpiresAt,
            client: oauthAccessToken.client,
            user: oauthAccessToken.user,
            scope: oauthAccessToken.scope
        }
        return new Promise(resolve => resolve(tokenToReturn));

    },
    getAccessToken: async accessToken => {
        const oauthToken = await oauthDB.OAuthTokensModel.findOne({
            accessToken
        });
        console.log("GETTING ACCESS TOKEN......");
        console.log(oauthToken);
        return new Promise(resolve => resolve(oauthToken));
    },
    getRefreshToken: async refreshToken => {
        const oauthToken = await oauthDB.OAuthTokensModel.findOne({
            refreshToken
        });
        console.log("GETTING REFRESH TOKEN......", refreshToken);
        console.log(oauthToken);
        return new Promise(resolve => resolve(oauthToken))
    },
    revokeToken: async token => {
        let tokenFoundAndDeleted;
        try {
            console.log("REVOKING ACCESS TOKEN......", token);
            await oauthDB.OAuthTokensModel.deleteOne({
                accessToken: token.accessToken
            });
            tokenFoundAndDeleted = true;
        } catch (e) {
            tokenFoundAndDeleted = false;
        }
        return new Promise(resolve => resolve(tokenFoundAndDeleted))
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
        authCode.redirectUri = code.redirectUri;
        console.log(authCode);
        return new Promise(resolve => resolve(authCode))
    },
    getAuthorizationCode: async code => {

        const authCode = await oauthDB.OAuthAuthorizationCodes.findOne({
            authorizationCode: code
        }).exec();
        console.log("GETTING AUTHORIZATION_CODE......");
        console.log(code);
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
    validateScope: (user, client, scope) => {
        console.log("GETTING ALLOWED SCOPE BETWEEN USER ", user, "AND CLIENT ", client);
        //TODO: making mongoose call to get scope between user and client

        //In this case Im returning hardcoded scope
        return new Promise(resolve => resolve("read:wallet,write:wallet"));
    }
    ,
    verifyScope: (token, scope) => {
        //If allowed scope is the subset of the scopes that a token has, allow that request
        let tokenScopeSet = new Set(token.scope.split(","));
        let scopeToVerifySet = new Set(scope.split(","));
        console.log("VERIFYING SCOPE......");
        console.log("TOKEN SCOPE: ", tokenScopeSet);
        console.log("SCOPE NEEDED FOR THIS ENDPOINT: ", scopeToVerifySet);

        if (tokenScopeSet.size < scopeToVerifySet.size) {
            return new Promise(resolve => resolve(false))
        }
        for (let scope of scopeToVerifySet) {
            if (!tokenScopeSet.has(scope)) {
                return new Promise(resolve => resolve(false));
            }
        }
        return new Promise(resolve => resolve(true));


    }
}
