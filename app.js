const express = require('express')
const mongoose = require('mongoose')
const server = express()
const login = require('./routes/login')
const workouts = require('./routes/workouts')
const customers = require('./routes/customers')
const admin = require('./routes/admin')
const search = require('./routes/search') // search change

server.use(express.static('public'))
server.set("view engine", "ejs")

// Redirects to all route files

server.use('/login', login)
server.use('/search', search)
server.use('/cart', customers)
server.use("/adminPage", admin);
server.use("/", workouts)

server.use(express.urlencoded({ extended: false }))

// Connecting to the mongoDB
mongoose.connect(process.env.MONGO_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

server.listen(process.env.PORT);


// LOGIN CODE ##########
// const session = require('express-session');
// app.use(session({
//     secret: 'foo',    
//     saveUninitialized: false,
//     resave: false
// }))