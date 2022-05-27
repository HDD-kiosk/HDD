const e = require("express");
var express = require("express");
var app = express();
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

let audioFile = null;

const fs = require("fs");
const request = require("request");
const clientId = "5dpql0ebdi";
const clientSecret = "BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R";

router.post("/", multipartMiddleware, function(req, res) {
  audioFile = req.files;
  stt("Kor", audioFile);
  res.json({
    state: "Ok",
  });
});

function stt(language, filePath) {
  const url = `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=${language}`;
  const requestConfig = {
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "X-NCP-APIGW-API-KEY-ID": clientId,
      "X-NCP-APIGW-API-KEY": clientSecret,
    },
    body: fs.createReadStream(filePath),
  };

  request(requestConfig, (err, response, body) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(response.statusCode);
    console.log(body);
  });
}

module.exports = router;
