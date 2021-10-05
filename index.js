const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessionConfig = require('./config/sessionConfig');
const app = express();
const morgan = require('morgan')
const swagger = require('./utils/swagger');

app.use('/api/docs', swagger.router);

app.use(morgan('dev'))
app.use(sessionConfig);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/client', require('./routes/oauthClientRoutes'));
app.use('/oauth', require('./routes/oauthAuthRoutes'));
app.use('/wallet', require('./routes/walletRoutes'));

app.listen(1234)
console.log("Oauth Server listening on port ", 1234)
module.exports = app
