const mongoose = require('mongoose');
const Requests = require('../models/Requests')


const CommandsSchema = mongoose.Schema({
    idTable: {
        type: Int16Array,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    requests: [Requests],

});

module.exports = Command = mongoose.model('Command', CommandsSchema);

module.exports = Command