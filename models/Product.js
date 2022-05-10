const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        require: true
    },
    size: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model('Product', UserSchema);

module.exports = Product