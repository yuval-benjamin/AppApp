
const AdminService = require("../services/admin")

async function GetAdminPage(req, res){
    res.render("adminPage", {})
}

module.exports = {
    GetAdminPage
}