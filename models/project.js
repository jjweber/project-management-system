var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    projectType: {
        type: String
    },
    name: {
        type: String
    },
    status: {
        type: String
    },
    dueDate: {
        type: Date
    },
    contractor: {
        type: String
    },
    designer: {
        type: String
    },
    notes: {
        type: Array
    }
});

module.exports = mongoose.model('Project', schema);