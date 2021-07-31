const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new Schema({
    group: {
        type: String,
        ref:'Group',
    },
    sender: {
        type: String,
        ref:'User',
    },
    users:[{
        type:String,
        ref:'User',
    }],
    message:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', message)