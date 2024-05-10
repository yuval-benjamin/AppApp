
const AdminService = require("../services/Admin")

async function GetAdminPage(req, res){
    res.render("adminPage", {})
}

module.exports = {
    GetAdminPage
}