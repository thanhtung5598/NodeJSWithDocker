const { v4: uuidV4 } = require("uuid");
const AWS = require("aws-sdk");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/handle-error");

const TABLE_NAME = "students";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getStudents = async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const students = await docClient.scan(params).promise();
    sendSuccessResponse(res, {
      message: "success",
      data: students,
    });
  } catch (err) {
    sendErrorResponse(res, {
      error: "Error",
    });
  }
};

module.exports.createStudent = async (req, res) => {
  const { name, age } = req.body;
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuidV4(),
      name,
      age,
    },
  };
  try {
    await docClient.put(params).promise();
    sendSuccessResponse(res, {
      message: "success",
    });
  } catch (err) {
    sendErrorResponse(res, {
      error: "Error",
    });
  }
};

module.exports.removeStudent = async (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  try {
    await docClient.delete(params).promise();
    sendSuccessResponse(res, {
      message: "success",
    });
  } catch (err) {
    sendErrorResponse(res, {
      error: "Error",
    });
  }
};

module.exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
    AttributeUpdates: {
      name: {
        Action: "PUT",
        Value: name,
      },
      age: {
        Action: "PUT",
        Value: age,
      },
    },
  };

  try {
    await docClient.update(params).promise();
    sendSuccessResponse(res, {
      message: "success",
    });
  } catch (err) {
    sendErrorResponse(res, {
      error: "Error",
    });
  }
};
