const mongoose = require('mongoose')
const Schema = mongoose.Schema

const group = new Schema({
    type: {
        type: String,
        default: 'DM',
    },
    name: {
        type: String,
        required: false,
    },
    createdAt:{
        type:Date,
        default: new Date(Date.now()),
    },
    updatedAt:{
        type: Date,
        default: new Date(Date.now()),
    }
})

module.exports = mongoose.model('Group', group)