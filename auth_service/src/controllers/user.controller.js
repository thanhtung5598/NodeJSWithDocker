const jwtHelper = require("../helpers/jwt.helper");
const Account = require("../models/account.model");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const getProfile = async (req, res) => {
  const token =
    req.headers["x-access-token"] || req.headers.authorization.split(" ")[1];
  const decoded = await jwtHelper.verifyToken(token, accessTokenSecret);
  const userDecode = decoded.data;
  const user = await Account.findOne({ email: userDecode.email }).select(
    "-password"
  );
  return res.status(200).send(user);
};

module.exports = {
  getProfile: getProfile,
};
