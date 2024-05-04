// require('dotenv').config({ path: './config/.env.local' });
const express = require('express')
const server = express()
const workoutsController = require('./controllers/workouts')
const customersController = require('./controllers/customers')

server.use(express.static('public'))

server.get("/home", workoutsController.GetHomePage)
server.get("/nearme", workoutsController.GetNearMePage)

server.set("view engine", "ejs");
server.use("/", require("./routes/login"));
server.use("/signup", require("./routes/login"));
server.use(express.urlencoded({ extended: false }));  

// server.listen(80)
server.listen(process.env.PORT);

// LOGIN CODE ##########
// require("dotenv").config();

// const mongoose = require("mongoose");
// mongoose.connect(process.env.DB_CONNECTION_STRING, { 
//     useUnifiedTopology: true, 
//     useNewUrlParser: true 
// });

// const session = require('express-session');
// app.use(session({
//     secret: 'foo',    
//     saveUninitialized: false,
//     resave: false
// }))