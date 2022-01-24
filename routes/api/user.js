var express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../models')
let Response = require('../../wrapper/response')

require('dotenv').config();

var router = express.Router();

router.post('/register', async function (req, res, next) {
  const { email, name, phone, password, retypepassword } = req.body
  try {
    if (password !== retypepassword) {
      return res.status(400).json(new Response({ message: 'Password and Retype Password tidak sama' }))
    }
    let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    let existinguser = await models.User.findOne({ where: { email } })
    if (existinguser && existinguser.email === email) {
      return res.status(400).json(new Response({ message: 'Email sudah digunakan' }))
    }
    await models.User.create(
      {
        email,
        name,
        phone,
        password,
        token,
        role: 'user'
      }
    )
    res.status(201).json(new Response({
      data: {
        email: user.email
      },
      token: user.token
    }))
  } catch (err) {
    console.error(err)
    res.status(500).json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body
    let user = await models.User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.status(400).json(new Response({ message: 'User tidak ditemukan' }))
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json(new Response({ message: 'Password tidak cocok' }))
    }
    let token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    await models.User.update({ token }, { where: { email: req.body.email } })
    res.json(new Response({
      email,
      token
    }))
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response(null, 'Terjadi kesalahan'))
  }
})

router.get('/logout', async function (req, res, next) {
  let token = req.header('Authorization').split(' ')[1];
  try {
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    let user = await models.User.update({ token: null }, { where: { email }, returning: true })
    if (!user) {
      res.json(new Response({ message: 'User tidak ditemukan' }))
    }
    res.json(new Response({ message: 'User berhasil logout' }))
  } catch (err) {
    console.error(err);
    res.status(500).json(new Response(null, 'Terjadi kesalahan'))
  }
})


module.exports = router;
