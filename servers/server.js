const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const fs = require("fs");
const request = require("request");

const clientId = "5dpql0ebdi";
const clientSecret = "BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R";

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

stt("Kor", "./heykakao.wav");

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
