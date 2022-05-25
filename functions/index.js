const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require('cors')({ origin: true });
const fs = require("fs");
const request = require('request');
const clientId = '5dpql0ebdi';
const clientSecret = 'BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R';

// 어드민 초기화. 클라우드 함수, 호스팅만 사용할 경우 따로 설정파일을 넘겨주지 않아도 됨
admin.initializeApp();
app.use(express.json());

// '../src/img/testVoice.mp3'

exports.apicall = functions.https.onRequest((req, response) => {
  cors(req, response, () => {
    const requestConfig = request.post(
      {
        url: 'https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-NCP-APIGW-API-KEY-ID': clientId,
          'X-NCP-APIGW-API-KEY': clientSecret,
        },
        body: fs.createReadStream('../src/img/heykakao.wav'),
      }
    );

    request(requestConfig, (err, response, body) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(response.statusCode);
      console.log(body); //WoW
    });
  });
});
