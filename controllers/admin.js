
const AdminService = require("../services/admin")

async function GetAdminPage(req, res){
    res.render("adminpage", {})
}

module.exports = {
    GetAdminPage
}