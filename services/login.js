const User = require("../models/customers");

async function login(username, password) {
    const user = await User.findOne({ _id: username, password });
    return user != null
}

async function register(firstName , lastName , username , email , gender , birthDate , password) {

    const user = new User({
        _id: username,
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        password
    });

    await user.save()        
}

module.exports = { login, register }