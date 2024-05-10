const express = require('express')
const mongoose = require('mongoose')
const server = express()
const login = require('./routes/login')
const workouts = require('./routes/workouts')
const admin = require('./routes/Admin')

server.use(express.static('public'))
server.set("view engine", "ejs");

server.use('/login', login)
server.use("/", workouts);
server.use("/adminPage", admin);

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