class Login {
     getLoginPage = async (req, res, next) => {
        try{
            res.render('login')
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new Login()
