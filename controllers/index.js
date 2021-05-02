//modules
const fs = require("fs");
const csv = require("csv-parser");
const service = require("../services");

let controller = {
  // ----------- ABOUT --------------
  about: (req, res, next) => {
    let aboutInfo = {
      name: "file controller",
      version: "1.0.0",
      description: "my exam's API"
    };
    res.json(aboutInfo);
  },
  // ----------- FILE INFO -----------
  playerInfo: (req, res, next) => {
    //TODO: validate hash
    if (!req.params || !req.params.id) {
      errResponse(res, 400, {
        error: "missing player id",
        msg: "please add player id to request path",
      });
      return;
    }
    let id = req.params.id;
    let f = true;
    fs.createReadStream("./files/players.csv")
      .pipe(csv())
      .on("data", (row) => {
        if(id === row.id){
          f = false;
          req.params.nickname = row.nickname;
          service.get(req,res,next)
          return;
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        if(f){
          errResponse(res, 400, {
            error: "invalid player id",
            msg: "please add a valid player id to request path",
          });
          return;
        }
      });
  },
};


function errResponse(res, status, data) {
  res.status(status).json(data);
}
module.exports = controller;
