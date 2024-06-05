const express = require('express')
const mongoose = require('mongoose')
const workoutsController = require('./controllers/workouts')
const customersController = require('./controllers/customers')
const server = express()
const login = require('./routes/login')
const home = require('./routes/home')
const workouts = require('./routes/workouts')
const search = require('./routes/search')
const customers = require('./routes/customers')

server.use(express.static('public'))
server.set("view engine", "ejs")

// Redirects to all route files
server.use("/", home)
server.use('/login', login)
server.use('/search', search)
server.use('/cart', customers)
server.use("/workouts", workouts)
server.use("/customers", workouts)
// server.use("/suppliers", workouts)

server.use(express.urlencoded({ extended: false }))

// Connecting to the mongoDB
mongoose.connect(process.env.MONGO_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

server.listen(process.env.BACK_PORT);


// LOGIN CODE ##########
// const session = require('express-session');
// app.use(session({
//     secret: 'foo',    
//     saveUninitialized: false,
//     resave: false
// }))