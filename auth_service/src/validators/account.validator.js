const { check, header, param } = require('express-validator')
const jwtHelper = require('../helpers/jwt.helper')
const bcrypt = require('bcryptjs')
const Account = require('../models/account.model')
const CONSTANT = require('../constants/account.constants')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const validateRegister = () => {
  return [
    check('name', CONSTANT.NAME_IS_REQUIRED).not().isEmpty(), // validate để trống trường email sử dụng hàm notEmpty()
    check('name', CONSTANT.NAME_SIZE).isLength({ min: 6, max: 32 }),
    check('email', CONSTANT.EMAIL_IS_REQUIRED).not().isEmpty(),
    check('email', CONSTANT.IS_EMAIL).isEmail(),
    check('email').custom((value, { req }) => {
      return Account.findOne({
        email: req.body.email
      }).then((account) => {
        if (account) {
          return Promise.reject(CONSTANT.EMAIL_AVAILABLE)
        }
      })
    }),
    check('password', CONSTANT.PASSWORD_IS_REQUIRED).not().isEmpty(),
    check('password', CONSTANT.PASSWORD_SIZE).isLength({ min: 6, max: 32 }),
    check('passwordConfirm', CONSTANT.PASSWORD_CONFIRM_IS_REQUIRED).not().isEmpty(),
    check('passwordConfirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(CONSTANT.PASSWORD_CONFIRM_INCORRECT)
      }
      return true
    })
  ]
}

const validateLogin = () => {
  return [
    check('email', CONSTANT.EMAIL_IS_REQUIRED).not().isEmpty(),
    check('email', CONSTANT.IS_EMAIL).isEmail(),
    check('email').custom((value, { req }) => {
      return Account.findOne({
        email: value
      }).then((account) => {
        if (!account) {
          return Promise.reject(CONSTANT.EMAIL_NOT_FOUND)
        }
      })
    }),
    check('email').custom((value, { req }) => {
      return Account.findOne({
        email: value
      }).then((account) => {
        console.log(account)
        if (account && account.active === false) {
          return Promise.reject(CONSTANT.ACCCOUNT_IS_NOT_ACTIVE)
        }
      })
    }),
    check('password', CONSTANT.PASSWORD_IS_REQUIRED).not().isEmpty(),
    check('password').custom((value, { req }) => {
      return Account.findOne({
        email: req.body.email
      }).then((account) => {
        if (account && (account.password === undefined || (account && bcrypt.compareSync(value, account.password) === false))) {
          return Promise.reject(CONSTANT.PASSWORD_INCORRECT)
        }
      })
    })
  ]
}

const validateForgotPassword = () => {
  return [
    param('email', CONSTANT.IS_EMAIL).isEmail(),
    param('email').custom((value, { req }) => {
      return Account.findOne({
        email: value
      }).then((account) => {
        if (!account) {
          return Promise.reject(CONSTANT.EMAIL_NOT_FOUND)
        }
      })
    })
  ]
}

const validateChangePassword = () => {
  return [
    header('x-access-token').custom(async (value, { req }) => {
      const token = value || req.headers.authorization.split(' ')[1]
      const decoded = await jwtHelper.verifyToken(
        token,
        accessTokenSecret
      )
      const account = await Account.findOne({ email: decoded.data.email, active: true })
      if (!account) throw new Error(CONSTANT.EMAIL_NOT_FOUND)
    }),
    check('newPassword', CONSTANT.NEW_PASSWORD_SIZE).isLength({ min: 6, max: 32 }),
    check('confirmNewPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(CONSTANT.PASSWORD_CONFIRM_INCORRECT)
      }
      return true
    })
  ]
}

const validateSendActiveAgain = () => {
  return [
    param('email', CONSTANT.IS_EMAIL).isEmail(),
    param('email').custom((value, { req }) => {
      return Account.findOne({
        email: value
      }).then((account) => {
        if (!account) {
          return Promise.reject(CONSTANT.EMAIL_NOT_FOUND)
        }
      })
    })
  ]
}

module.exports = {
  validateRegister: validateRegister,
  validateLogin: validateLogin,
  validateForgotPassword: validateForgotPassword,
  validateChangePassword: validateChangePassword,
  validateSendActiveAgain: validateSendActiveAgain
}
