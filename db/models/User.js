// 引入mongodb
const mongoose = require('../db/mongodb')
// 建立用户表
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: Number,
    default: null
  }
})

// 建立用户数据库模型
const User = mongoose.model('User', UserSchema)
module.exports = { User }
