//module
const axios = require("axios");
const querystring = require("querystring");
const fs = require("fs");
const reqPath = require("path");
//internal
const parseData = require("../util/parseData");

//csv writer
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "./files/playerResult.csv",
  header: [
    { id: "id", title: "id" },
    { id: "first_name", title: "first name" },
    { id: "last_name", title: "last name" },
    { id: "nickname", title: "nickname" },
    { id: "height_feet", title: "height feet" },
    { id: "height_inches", title: "height inches" },
    { id: "positions", title: "positions" },
    { id: "weight_ponds", title: "weight pounds" },
    { id: "teamid", title: "team id" },
    { id: "teamabbreviation", title: "team abbreviation" },
    { id: "teamcity", title: "team city" },
    { id: "teamconference", title: "team conference" },
    { id: "teamdivision", title: "team division" },
    { id: "teamfull_name", title: "team full name" },
    { id: "teamname", title: "team name" },
  ],
});

const path = "players";

const filePath = reqPath.join(__dirname, '../');

const services = {
  get: (req, res, next) => {
    let id = req.params.id;
    const options = {
      method: "GET",
      url: `${path}/${id}`,
    };
    axios(options)
      .then((response) => {
        response.data.nickname = req.params.nickname;
        let data = parseData(response.data);
        csvWriter
          .writeRecords(data)
          .then(() => {
            console.log("The CSV file was written successfully");
            
            res.sendFile(filePath+"files/playerResult.csv");
            return;
          })
          .catch((error) => {
            console.info(error);
            res.send(data);
            return;
          });
      })
      .catch((error) => {
        console.info(error);

        res
          .status(error.status || 500)
          .send(error.statusText || "Internal Server Error");
        return;
      });
  },
};

module.exports = services;

