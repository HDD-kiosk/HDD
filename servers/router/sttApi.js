const e = require("express");
var express = require("express");
var app = express();
var router = express.Router();

const fs = require("fs");
const request = require("request");
const clientId = "5dpql0ebdi";
const clientSecret = "BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R";


router.get("/api",  (req, response) => {
  //str = stt("Kor", "../servers/uploads/temp.wav");
  const requestConfig = request.post(
    {
      url: 'https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret,
      },
      body: fs.createReadStream('../servers/uploads/temp.wav'),
    }
  );
  request(requestConfig, (err, res, body) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(res.statusCode);
    console.log(body); 
    response.send(res);
  });

});

module.exports = router;