const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupUser = new Schema({
    group: {
        type: String,
        ref:'Group'
    },
    user: {
        type: String,
        ref: 'User',
    },
    lastReceivedId:{
        type:String,
        ref: 'User',
        required: false
    },
    lastReceivedAt:{
        type: Date,
        default: new Date(Date.now()),
    },
    lastReadId:{
        type:String,
        ref: 'User',
        required: false
    },
    lastReadAt:{
        type: Date,
        default: new Date(Date.now()),
    }
})

module.exports = mongoose.model('GroupUser', groupUser)