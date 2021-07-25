const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new Schema({
    senderEmail: {
        type: String,
        required: true,
        trim: true
    },
    receiverEmail: {
        type: String,
        required: true,
        trim: true
    },
    message:{
        type:String,
        required:true,
    },
    data:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', message)