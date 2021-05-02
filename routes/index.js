//modules
const express = require("express");
//internal
const controller = require("../controllers");

var router = express.Router({
  strict: true,
});
// ----------- API ENDPONT INFO -----------
router.get("/about", (req, res, next) => {
  res.send(controller.about(req, res, next));
});

// router.get("/check",(req,res,next)=>{
//   res.write();
// })
// ----------- ANALYSE FILE BY ID -----------
router.get("/:id", (req, res, next) => {
  controller.playerInfo(req, res, next);
});


module.exports = router;
