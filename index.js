const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessionConfig = require('./config/sessionConfig');
const app = express();

app.use(sessionConfig);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/clients', require('./routes/oauthClientRoutes'));
app.use('/oauth', require('./routes/oauthAuthRoutes'));
app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
});

app.listen(1234)
console.log("Oauth Server listening on port ", 1234)
module.exports = app
