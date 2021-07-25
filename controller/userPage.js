const User = require('../models/User')

class UserPage{
    getUsers = async (req, res, next) =>{
        try{
            const users = await User.find({}).lean()
            res.render('userPage', {user: req.user, users})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserPage()