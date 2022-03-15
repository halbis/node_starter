const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { urlencoded } = require("express");
const error = require("./middlewares/error");
const user = require("../routes/user.route");

module.exports = function (app) {
  //middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(urlencoded({ extended: false }));

  //routes
  app.use("/api", user);

  //middleware to handle error
  app.use(error);
};
