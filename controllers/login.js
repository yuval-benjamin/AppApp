const loginService = require("../services/login")
const workoutsService = require('../services/workouts')
const customersService = require('../services/customers')

function isLoggedIn(req, res, next) {
  if (req.session.username != null)
    return next()
  else
  res.render('login', { error: false })
}

async function GetHomePage(req, res){
  const workouts = await workoutsService.getAllWorkouts()
  const isAdmin = await customersService.isAdmin(req.session.username);
  res.render("home", {workouts , username: req.session.username, firstName: req.session.firstName, isAdmin})
}

function loginForm(req, res) { res.render('login', { error: false }) }

function registerForm(req, res) { res.render("register", {}) }

function logout(req, res) {
  req.session.destroy(() => {
    res.render('login', { error: false })
  });
}

async function login(req, res) {
  const { username, password } = req.body

  const result = await loginService.login(username, password)
  if (result) {
    req.session.username = username
    const customer = await customersService.getCustomerByUsername(username)
    req.session.firstName = customer.firstName;
    res.redirect('/')
  }
  else
    res.render('login', { error: true })
}

async function register(req, res) {
  const { firstName , lastName , username , email , gender , birthDate , password } = req.body
  try {
    await loginService.register(firstName , lastName , username , email , gender , birthDate , password)    
    req.session.username = username
    const customer = await customersService.getCustomerByUsername(username)
    req.session.firstName = customer.firstName
    res.redirect('/')
  }
  catch (e) { 
    res.redirect('/register?error=1')
  }    
}

module.exports = {
  login,
  loginForm,
  register,
  registerForm,
  logout,
  GetHomePage,
  isLoggedIn
}