const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const booksRouter = require("./controllers/bookControllers");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    family: 4,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(`error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/books", booksRouter);
app.use(middleware.serverError);
app.use(middleware.internalError);
app.use(middleware.errorHandler);

module.exports = app;
