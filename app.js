const express = require('express')
const server = express()
const workoutsController = require('./controllers/workouts')
const customersController = require('./controllers/customers')

server.use(express.static('public'))

server.get("/", customersController.getLoginPage)
server.get("/home", workoutsController.GetHomePage)
server.get("/nearme", workoutsController.GetNearMePage)
// server.get("/signup", workoutsController.getSignUpPage)


server.listen(80)