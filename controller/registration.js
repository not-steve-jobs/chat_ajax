const User = require('../models/User');
const bcrypt = require('bcryptjs');


class Registration{
    getPage = async (req, res, next) => {
        try {
            res.render('registration')
        } catch (e) {
            next(e)
        }
    }
    createUser = async ( req, res, next) => {
        try{

            const {email, password} = req.body
            const user = await User.findOne({email})
            if (user) throw new Error('user exist')
            const userModel = new User ({
              ...req.body,
                password:await bcrypt.hash(password, 10)
            })

            return res.status(200).json(await userModel.save());

        } catch (e) {
            next(e)
        }
    }
}
module.exports = new Registration()