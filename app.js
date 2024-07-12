const express = require('express')
const mongoose = require('mongoose')
const server = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const login = require('./routes/login')
const workouts = require('./routes/workouts')
const customers = require('./routes/customers')
const admin = require('./routes/admin')

server.use(express.static('public'))
server.set('view engine', 'ejs');
server.use(cors());
server.use(bodyParser.urlencoded({extended : true}));
server.use(express.json());


// Redirects to all route files

server.use('/login', login)
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