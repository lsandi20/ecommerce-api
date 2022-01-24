const jwt = require('jsonwebtoken');
const Response = require('../wrapper/response')
const models = require('../models')

module.exports = {
  isLoggedIn: async function (req, res, next) {
    let token = req.header('Authorization').split(' ')[1];
    try {
      let { email } = jwt.decode(token, process.env.SECRET_KEY)
      jwt.verify(token, process.env.SECRET_KEY, async function (err, decode) {
        let user = await models.User.findOne({ where: { email } })
        if (err) {
          if (err.name == 'TokenExpiredError') {
            if (user.token) {
              // refresh token
              let token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 });
              await models.User.update({ token }, { where: { email } })
              return res.json(new Response({
                message: 'Refresh Token',
                email,
                token
              }))
            }
          }
          return res.status(401).json(new Response({ message: 'Otentikasi gagal' }))
        }
        return next()
      })
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(null, 'Terjadi kesalahan'))
    }
  }
} 