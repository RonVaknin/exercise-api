//modules
const http = require('http');
const express = require("express");
const app = express();
const axios = require("axios");
//internal
const router = require("./routes");
const cachUpdate = require("./util/cachUpdate");
//environment variables
const port = process.env.PORT || 3000;
const frequency = process.env.UPDATE_FREQUENCY || 900000;

const api_version = "v1";
const path = "players";
const ball_api = `https://www.balldontlie.io/api`;


axios.defaults.baseURL = `${ball_api}/${api_version}`;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

setInterval(cachUpdate, frequency );


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
