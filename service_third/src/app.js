require("dotenv").config();

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
const indexRouter = require("./routes/book");
const uploadRouter = require("./routes/upload");

app.use("/book", indexRouter);
app.use("/upload", uploadRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
