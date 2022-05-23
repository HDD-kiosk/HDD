const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require('cors')({ origin: true });
const request = require('request');

// 어드민 초기화. 클라우드 함수, 호스팅만 사용할 경우 따로 설정파일을 넘겨주지 않아도 됨
admin.initializeApp();
app.use(express.json()); // body-parser 설정 
// const HDD = express.Router();
// app.use('/api', HDD);

const db = admin.firestore();

exports.apicall = functions.https.onRequest((req, response) => {
  cors(req, response, () => {
    request(
      `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor`,
      function(error, res, body) {
        response.send(res);
      }
    );
  });
});
