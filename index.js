const express = require('express')
const app = express();
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) throw err
    console.log('mongoose connected')
})

app.set('views', path.join(__dirname, '/views/'))
app.set('view engine', 'ejs')

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

require('./auth/passport')(passport);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static("./public"))

app.use('/', routes)

server.listen(PORT,()=>{
    console.log(`Server has been started on port ${PORT}`)
})