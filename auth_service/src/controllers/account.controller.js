const { validationResult } = require("express-validator");
const Account = require("../models/account.model");
const jwtHelper = require("../helpers/jwt.helper");
const CONSTANT = require("../constants/account.constants");
const MailService = require("../services/mail.service");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

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
  const errs = validationResult(req).formatWith(errorFormatter);
  if (!errs.isEmpty()) {
    return res.status(400).json(errs.array());
  }
  // body
  const email = req.body.email;
  const account = await Account.findOne({
    email,
  });

  const accessToken = await jwtHelper.generateToken(
    account,
    accessTokenSecret,
    accessTokenLife
  );

  const refreshToken = await jwtHelper.generateToken(
    account,
    refreshTokenSecret,
    refreshTokenLife
  );

  return res.send({
    message: CONSTANT.SIGN_IN_SUCCESS,
    status: CONSTANT.SUCCESS_CODE_200,
    auth: {
      accessToken,
      refreshToken,
      active: account.active,
    },
    profile: {
      email: account.email,
      name: account.name,
    },
  });
};

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
    active: false,
  });

  await account.save();

  const accessToken = await jwtHelper.generateToken(
    account,
    accessTokenSecret,
    accessTokenLife
  );

  const refreshToken = await jwtHelper.generateToken(
    account,
    refreshTokenSecret,
    refreshTokenLife
  );

  MailService.sendTokenAuthorizeAccount(account.email, accessToken);

  return res.send({
    message: CONSTANT.SIGN_UP_SUCCESS,
    status: CONSTANT.SUCCESS_CODE_200,
    auth: {
      accessToken,
      refreshToken,
      active: account.active,
    },
    profile: {
      email: req.body.email,
      name: req.body.name,
    },
  });
};

/**
 * This is function set status account to active
 * @param {*} req
 * @param {*} res
 * @param {headers} x-access-token
 */
const accountIsActive = async (req, res) => {
  const token =
    req.headers["x-access-token"] || req.headers.authorization.split(" ")[1];
  const decoded = await jwtHelper.verifyToken(token, accessTokenSecret);
  const account = decoded.data;
  await Account.findOneAndUpdate(
    { email: account.email },
    {
      active: true,
    }
  );
  return res.send({
    message: CONSTANT.ACTIVE_SUCCESS,
  });
};

module.exports = {
  signIn,
  signUp,
  accountIsActive,
};
