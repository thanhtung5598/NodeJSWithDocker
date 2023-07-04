require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL, {
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
const indexRouter = require("./routes/book");
const studentRouter = require("./routes/student");

app.use("/book", indexRouter);
app.use("/students", studentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
