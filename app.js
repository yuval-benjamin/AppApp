const express = require('express')
const mongoose = require('mongoose')
const workoutsController = require('./controllers/workouts')
const customersController = require('./controllers/customers')
const server = express()
const login = require('./routes/login')
const workouts = require('./routes/workouts')

server.use(express.static('public'))
server.set("view engine", "ejs");

server.use('/login', login)
server.use("/", workouts);

server.use(express.urlencoded({ extended: false }))

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