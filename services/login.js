const User = require("../models/customers");

async function login(username, password) {
    const user = await User.findOne({ _id: username, password });
    return user != null
}

async function register(firstName , lastName , username , email , gender , birthDate , password, isAdmin) {

    const user = new User({
        _id: username,
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        password,
        isAdmin
    });

    await user.save()        
}

module.exports = { login, register }