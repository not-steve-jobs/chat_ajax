const express = require('express')
const router = express.Router()
const passport = require('passport');
const {checkIsAuthenticated, forwardAuthenticated} = require('../auth/auth')


const {homePage} = require('../controller/home')
const Registration = require('../controller/registration')
const Login = require('../controller/login')
const UserPage = require('../controller/userPage')
const CreateMessage = require('../controller/createMessage')


router.get('/', homePage)
router.get('/reg',forwardAuthenticated, Registration.getPage)
router.get('/login',forwardAuthenticated, Login.getLoginPage)
router.get('/users',checkIsAuthenticated, UserPage.getUsers)

router.post('/reg', Registration.createUser)
router.post('/createMessage', CreateMessage.crete)
router.post('/getMessages', CreateMessage.getMessages)
router.post('/login',
    passport.authenticate('local',
        { successRedirect: '/users',
        failureRedirect: '/login' }
    )
);

module.exports = router