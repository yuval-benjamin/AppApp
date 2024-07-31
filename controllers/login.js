const loginService = require("../services/login")
const customersService = require('../services/customers')
const path = require('path').resolve(__dirname, '..')

function isLoggedIn(req, res, next) {
  if (req.session.username != null)
    return next()
  else
  res.render('login', { error: false })
}

async function GetHomePage(req, res){
  res.sendFile("public/views/home.html", { root: path});
}

async function isAdmin(req, res, next) {
  const isAdmin = await customersService.isAdmin(req.session.username);
  res.json({ isAdmin });
}

function loginForm(req, res) { res.render('login', { error: false }) }

function registerForm(req, res) { res.render('register', { error: null }) }

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
    
    // If username exists, redirect back to register and show error
    if(await customersService.getCustomerByUsername(username)) {
      return res.render('register', { error: 'Username already taken' })
    }

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

async function getSessionUsername(req, res) {
  const username = req.session.username
  res.json({ username });

}

module.exports = {
  login,
  loginForm,
  register,
  registerForm,
  logout,
  GetHomePage,
  isLoggedIn,
  isAdmin,
  getSessionUsername
}