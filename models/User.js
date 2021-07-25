const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('User', user)