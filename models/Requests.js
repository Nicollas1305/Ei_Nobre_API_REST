const mongoose = require('mongoose');

const RequestsSchema = mongoose.Schema({
    idRequest: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    value: {
        type: mongoose.Schema.Types.Decimal128,
        require: true
    }
});



module.exports = Requests = mongoose.model('Requests', RequestsSchema);

module.exports = Requests