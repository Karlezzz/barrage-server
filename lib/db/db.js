const mongoose = require('mongoose')
const {user}  = require('./schema/user')

const userModel = mongoose.model('userModel',user,'user')
