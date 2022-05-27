const e = require("express");
var express = require("express");
var app = express();
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const multer = require("multer");
let audioFile = null;

const fs = require("fs");
const request = require("request");
const clientId = "5dpql0ebdi";
const clientSecret = "BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R";

let text = "";

// router.post("/", multipartMiddleware, function(req, res) {
//   audioFile = req.files;
//     // stt("Kor", audioFile);
//   res.json({
//     state: "Ok",
//   });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "temp.wav"); // 파일 원본이름 저장
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  stt("Kor", "../servers/uploads/temp.wav");
  res.status(201).send({
    message: "audio 저장성공",
    fileInfo: req.file,
    text: text,
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
