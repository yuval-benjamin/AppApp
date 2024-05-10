const express = require('express')
const mongoose = require('mongoose')
const workoutsController = require('./controllers/workouts')
const customersController = require('./controllers/customers')
const server = express()

server.use(express.static('public'))

server.get("/home", workoutsController.GetHomePage)
server.get("/nearme", workoutsController.GetNearMePage)

server.set("view engine", "ejs");
server.use("/", require("./routes/login"));
server.use("/signup", require("./routes/login"))
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