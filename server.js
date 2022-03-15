const express = require("express");
const app = express();
const path = require("express");
require("dotenv").config();
//static files
app.use(express.static(path.join(__dirname, "public")));
//logger setup
require("./config/logging");
//db setup
require("./config/db");
//starter configs
require("./config/startup")(app);

//creating server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//configuring socket
// const io = require("socket.io")(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });
// io.on("connect", (socket) => {
//   console.log("user connected");
//   socket.on("disconnect", () => console.log("user exit"));
// });
// app.set("socket", io);
