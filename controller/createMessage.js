const Message = require('../models/message')
const User = require('../models/User')
const Group = require('../models/group')
const GroupUser = require('../models/groupUser')
const { Server } = require("socket.io");


class CreateMessage{
    constructor() {
        this.server = new Server()
    }
   static crete =  async (req,res,next)=>{
       try {
           const {receiverId ,message,groupId} = req.body;
           const receiver = await User.findById(receiverId);
           if(!receiver) {
               throw new Error('receiver not found');
           }
           let group;
           if(!groupId) {
               group = new Group({})
               await group.save()
           }else {
               group = await Group.findById(groupId);
           }
           const messageModel = new Message({
               sender:req.user._id,
               message,
               users:[receiver._id,req.user._id],
               group
           })
           await messageModel.save();
           const groupUserModel = new GroupUser({
               group,
               user:req.user._id,
           });
           await groupUserModel.save();
           const room = group.id;
           await this.broadcast(null, messageModel, room);
           return res.status(200).json({messageModel});
       }catch (e){
           next(e)
       }
    }
    async broadcast(socket, eventName, message, room) {
        if (socket) {
            socket.broadcast.to(room).emit(eventName, message);
        } else {
            this.server.to(room).emit(eventName, message);
        }
    }
    static getMessages = async (req,res,next)=>{
       try {
           const { receiverEmail } = req.body
           const receiver = await User.findOne({email:receiverEmail})
           if(!receiver) {
               throw new Error('User not found');
           }
           const messagesSender = await Message.find({
               receiverEmail,
               senderEmail:req.user.email
           }).lean()
           const messagesReceiver = await Message.find({
               receiverEmail:req.user.email,
               senderEmail:receiverEmail
           }).lean()
           const messages = [...messagesSender,...messagesReceiver].sort(compare)
           console.log(messages,444)
           return res.json({messages})
       }catch (e) {
           console.log(e)
       }
    }
}
function compare( a, b ) {
    if ( a.data < b.data ){
        return -1;
    }
    if ( a.data > b.data ){
        return 1;
    }
    return 0;
}

module.exports = CreateMessage