const express = require('express')
const mongoose = require('mongoose')
const app = express()
const home = require('./routes/home')
const bodyParser = require('body-parser');
const cors = require('cors');
const login = require('./routes/login')
const workouts = require('./routes/workouts')
const customers = require('./routes/customers')
const admin = require('./routes/admin')
const search = require('./routes/search')

// Connecting to the mongoDB
mongoose.connect(process.env.MONGO_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

const session = require('express-session');
app.use(session({
    secret: 'wusha',    
    saveUninitialized: false,
    resave: false
}))

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(cors());
app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

// Redirects to all route files
app.use('/search', search)
app.use('/cart', customers)
app.use("/adminPage", admin)
app.use("/", login)
app.use("/home", home)
app.use("/workouts", workouts)

app.listen(process.env.PORT);