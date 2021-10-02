const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/oauth2_playground';

mongoose.connect(DB_URL, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + DB_URL + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + DB_URL);
    }
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = mongoose;
