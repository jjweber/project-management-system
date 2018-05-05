var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    usersName: {
        type: String
    }
});

module.exports = mongoose.model('User', schema);