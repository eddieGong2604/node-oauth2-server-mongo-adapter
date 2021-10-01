const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessionConfig = require('./sessionConfig');
const app = express();

app.use(sessionConfig);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/clients', require('./oauthClientRoutes'));
app.use('/oauth', require('./oauthAuthRoutes'));


app.listen(1234)
console.log("Oauth Server listening on port ", 1234)
module.exports = app
