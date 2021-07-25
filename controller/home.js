const homePage = async (req, res, next) =>{
    try {
        res.render('home',{user:req.user})
    } catch (e) {
        next(e)
    }
}
module.exports = {
    homePage
}