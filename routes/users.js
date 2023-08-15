var express = require('express');
var router = express.Router();
// const { User } = require('../db/models/User')

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// router.post('/register', async (req, res, next) => {
//   const user = User.create({
//     username: req.body.username,
//     password: req.body.password
//   })
//   res.send(user)
// })

module.exports = router;
