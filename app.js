const express = require('express')
const mongoose = require('mongoose')
const app = express()
const home = require('./routes/home')
const login = require('./routes/login')
const workouts = require('./routes/workouts')
const customers = require('./routes/customers')
const admin = require('./routes/admin')
const search = require('./routes/search') // search change

// Connecting to the mongoDB
mongoose.connect(process.env.MONGO_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

const session = require('express-session');
app.use(session({
    secret: 'foo',    
    saveUninitialized: false,
    resave: false
}))

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })); 

// Redirects to all route files
app.use('/search', search)
app.use('/cart', customers)
app.use("/adminPage", admin)
app.use("/", login)
// app.use("/", home)
app.use("/workouts", workouts)

app.listen(process.env.PORT);