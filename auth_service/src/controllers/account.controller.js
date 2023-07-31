const { validationResult } = require("express-validator");
const Account = require("../models/account.model");
const jwtHelper = require('../helpers/jwt.helper')
const CONSTANT = require('../constants/account.constants')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE


const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return {
    msg: msg,
    param: param,
  };
};

/**
 * service sign
 * @param {*} req
 * @param {*} res
 * @param {body} email
 * @param {body} password
 */
const signIn = async (req, res) => {
  // validation
  const errs = validationResult(req).formatWith(errorFormatter)
  if (!errs.isEmpty()) {
    return res.status(400).json(errs.array())
  }
  // body
  const email = req.body.email
  const account = await Account.findOne({
    email: email
  })

  const accessToken = await jwtHelper.generateToken(
    account,
    accessTokenSecret,
    accessTokenLife
  )

  const refreshToken = await jwtHelper.generateToken(
    account,
    refreshTokenSecret,
    refreshTokenLife
  )

  return res.send({ accessToken, refreshToken })
}

/**
 * service signup
 * @param {*} req
 * @param {*} res
 * @param {body} email
 * @param {body} name
 * @param {body} password
 * @param {body} passwordConfirm
 */
const signUp = async (req, res) => {
  const errs = validationResult(req).formatWith(errorFormatter);
  if (!errs.isEmpty()) {
    return res.status(400).json(errs.array());
  }
  // body
  const account = new Account({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  await account.save();

  const accessToken = await jwtHelper.generateToken(
    account,
    accessTokenSecret,
    accessTokenLife
  );
  
  return res.send({
    message: CONSTANT.SIGN_UP_SUCCESS,
    accessToken,
    status: 'OK'
  });
};

module.exports = {
  signIn,
  signUp,
};
