const mongoose = require('mongoose');

const RequestsSchema = mongoose.Schema({
    idRequest: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    products: {
        type: Array,
        require: true
    },
    quantidade: {
        type: Number,
        require: true
    },
    valorTotal: {
        type: mongoose.Schema.Types.Decimal128,
        require: true
    },
});


module.exports = Requests = mongoose.model('Requests', RequestsSchema);

module.exports = Requests
