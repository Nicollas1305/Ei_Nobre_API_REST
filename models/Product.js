const { contentType, type } = require('express/lib/response');
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    /*  _id: {
         type: String,
         default: ObjectId
     }, */
    name: {
        type: String,
        require: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        require: true
    },
    size: {
        type: Array,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    images: {
        data: Buffer,
        contentType: String
    },
    nameImage: {
        type: String,
        require: true
    }
});

module.exports = Product = mongoose.model('Product', ProductSchema);

module.exports = Product