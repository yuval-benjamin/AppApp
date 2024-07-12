
const AdminService = require("../services/admin")
const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')
const path = require('path').resolve(__dirname, '..')

async function GetAdminPage(req, res){
    res.sendFile("public/views/adminPage.html", { root: path });
}

async function GetChartsPage(req, res){
    const customers = await customersService.getAllCustomers()
    res.render("charts", { customers })
}

async function GetFacebookPage(req, res){
    // res.render("facebook", {})
    res.sendFile("public/views/facebook.html", { root: path });
}

async function GetFollowers(req, res){
    const response = await fetch('https://graph.facebook.com/v12.0/335781382944543?fields=followers_count', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.FACEBOOK_TOKEN
        }
    })
    console.log("------ res --------------")
    console.log(response.json)
    console.log("------ res --------------")
    res.json(response.json)

}

module.exports = {
    GetAdminPage,
    GetChartsPage,
    GetFacebookPage,
    GetFollowers
}