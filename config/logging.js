require("winston-mongodb");
const winston = require("winston");

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "mainlog.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI,
      level: "info",
    })
  );
  //handling exception outside request pipeline i.e out of express
  new winston.ExceptionHandler(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtexceptions.log" })
  );
  new winston.RejectionHandler(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "unhandlerejections.log" })
  );
};
