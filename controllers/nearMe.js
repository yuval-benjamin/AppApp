const path = require('path').resolve(__dirname, '..')

async function GetNearMePage(req, res){
    res.sendFile("public/views/nearMe.html", { root: path });
}

module.exports = {
    GetNearMePage
}