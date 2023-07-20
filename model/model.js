const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const userShema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
})

// Pour rendre email unique
mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('user', userShema)