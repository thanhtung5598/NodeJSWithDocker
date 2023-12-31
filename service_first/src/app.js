require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

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
const productsRouter = require("./routes/product");
const indexRouter = require("./routes/book");
const studentRouter = require("./routes/student");
const orderRouter = require("./routes/order");

// router
const apiVersion = "/api/v0/";

app.use(apiVersion, productsRouter);
app.use(apiVersion, indexRouter);
app.use(apiVersion, studentRouter);
app.use(apiVersion, orderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
