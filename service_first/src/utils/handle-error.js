const sendSuccessResponse = (res, callback) => {
  res.status(200).json(callback);
};

const sendErrorResponse = (res, callback) => {
  res.status(500).json(callback);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
