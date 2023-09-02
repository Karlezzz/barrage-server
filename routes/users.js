var express = require('express');
var router = express.Router();
const { User } = require('../lib/models')

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/userLogin', (req, res, next) => {
  //get Room info and check password
  //find user from sql
  //set user or update user
  //return token, user
  const jwt = require('jsonwebtoken')
  const secret = "barrageDGUTSecret111"


  const { body } = req
  const { roomId, name, id, originToken, ipAddress, password } = body
  let token = ''

  jwt.verify(originToken, secret, (err, decode) => {
    if (err) {
      token = jwt.sign({
        name, id
      }, secret, {
        expiresIn: 60 * 60 * 2
      });
    } else {
      token = originToken
    }
  })

  const data = {
    name,
    roomId,
    id,
    token,
    message: 'ok',
    code: 200
  }
  res.send(data)
})

module.exports = router;
