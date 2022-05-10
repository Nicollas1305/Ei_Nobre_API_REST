const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    identity: {
        type: Number,
        require: true
    },
    cpf: {
        type: Number,
        unique: true,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    telephone: {
        type: Number,
        require: true
    },
    responsibility: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
})


const User = mongoose.model('User', UserSchema);

module.exports = User