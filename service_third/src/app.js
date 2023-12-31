require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT;

// enable file upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 1000 * 1024 * 1024 },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// Database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routers
const uploadRouter = require("./routes/upload");

// router
const apiVersion = '/api/v0/'

app.use(apiVersion, uploadRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
