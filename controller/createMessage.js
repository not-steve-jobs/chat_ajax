const Message = require('../models/message')
const User = require('../models/User')
class CreateMessage{
   static crete =  async (req,res,next)=>{
       try {
           const {email ,data} = req.body;
           const receiver = await User.findOne({email});
           if(!receiver) {
               throw new Error('User not found');
           }
           const message = new Message({
               senderEmail:req.user.email,
               receiverEmail:receiver.email,
               message:data
           })
           await message.save();
           return res.status(200).json({message});
       }catch (e){
           next(e)
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