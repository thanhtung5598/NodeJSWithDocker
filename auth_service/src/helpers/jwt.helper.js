const jwt = require('jsonwebtoken')

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      active: user.active
    }
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife // hết hạn
      },
      (error, token) => {
        if (error) {
          return reject(error)
        }
        resolve(token)
      })
  })
}

const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      resolve(decoded)
    })
  })
}
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
}
