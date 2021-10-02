const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

const sessionConfig = sessions({
    secret: "secret",
    saveUninitialized: true,
    cookie: {maxAge: oneDay, httpOnly: true},
    resave: false
});

module.exports = sessionConfig;