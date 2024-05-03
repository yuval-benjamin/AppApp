const express = require('express')
const server = express()
const workoutsController = require('./controllers/workouts')
const customersController = require('./controllers/customers')


server.get("/", customersController.getLoginPage)
server.get("/home", workoutsController.GetHomePage)


server.listen(80)