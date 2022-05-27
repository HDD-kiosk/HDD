const e = require("express");
var express = require("express");
var app = express();
var router = express.Router();

router.post("/", function(req, res) {
  console.log(req.body);
  res.json({
    state: "Ok",
  });
});

module.exports = router;
