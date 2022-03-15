const mongoose = require("mongoose");
const winston = require("winston");

//DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    winston.info("connected to database...");
  });
