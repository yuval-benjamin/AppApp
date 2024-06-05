const express = require('express')
const mongoose = require('mongoose')
const server = express()
const login = require('./routes/login')
const home = require('./routes/home')
const search = require('./routes/search')
const customers = require('./routes/customers')

server.use(express.static('public'))
server.set("view engine", "ejs")

// Redirects to all route files
server.use("/", home)
server.use('/login', login)
server.use('/search', search)
server.use('/cart', customers)

server.use(express.urlencoded({ extended: false }))

// Connecting to the mongoDB
mongoose.connect(process.env.MONGO_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

server.listen(process.env.FRONT_PORT);


// LOGIN CODE ##########
// const session = require('express-session');
// app.use(session({
//     secret: 'foo',    
//     saveUninitialized: false,
//     resave: false
// }))