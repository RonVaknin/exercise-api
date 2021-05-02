//modules
const axios = require("axios");
const fs = require("fs");
const csv = require("csv-parser");
const reqPath = require("path");

//internal
const filePath = reqPath.join(__dirname, "../files/playerRequest.csv");
const parseData = require("../util/parseData");
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

function check() {
  console.info("Server runing cach update.");
  fs.createReadStream("./files/players.csv")
    .pipe(csv())
    .on("data", (row) => {
      getData(row.id, row.nickname);
    })
    .on("end", () => {
      console.log("CSV file successfully checked, cach update done.");
      return;
    });
}

module.exports = check;

function getData(id,nickname) {
  const options = {
    method: "GET",
    url: `${path}/${id}`,
  };
  axios(options)
    .then((response) => {
      response.data.nickname = nickname;
      let data = parseData(response.data);
      csvWriter
        .writeRecords(data)
        .then(() => {
          return;
        })
        .catch((error) => {
          console.info(error);
          return;
        });
    })
    .catch((error) => {
      console.info(error);
      return;
    });
}
