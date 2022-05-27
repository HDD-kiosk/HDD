const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require('cors')({ origin: true });
const fs = require("fs");
const request = require('request');
const clientId = '5dpql0ebdi';
const clientSecret = 'BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R';
const KAKAO_TTS_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize';
const REST_API_KEY = '9063332fecca3b9e512ce29c057add84';
var router = express.Router();

//전역변수로 해보자
//const xmlData = `<speak>${STT_TEXT}</speak>`; // 여기에 STT를 넣으면 성공
const xmlData = '<speak>이건길이가6</speak>'; // 여기에 STT를 넣으면 성공

// 어드민 초기화. 클라우드 함수, 호스팅만 사용할 경우 따로 설정파일을 넘겨주지 않아도 됨
admin.initializeApp();
app.use(express.json());

// '../src/img/testVoice.mp3'

// STT Function
exports.apicall = functions.https.onRequest((req, response) => {
  // 혁재꺼
  // router.get('http://localhost:5000/hdd-client/us-central1/apicall', function (
  //   req,res
  // ){
  //   console.log(req);
  //   res.json({
  //     text: '텍스트내용',
  //   });
  // });

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

    request(requestConfig, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("index.js에서 STT response.statusCode:",response.statusCode);
      console.log("index.js에서 STT body: ",body); //WoW
      response.send(res);

    });
  });
  
});




// TTS Function     xmlData 맨위 전역변수로 선언해놓음
exports.ttsCall  = functions.https.onRequest((req, response) => {
  cors(req, response, () => {
    const requestConfig = request.post(
      {
        url: KAKAO_TTS_URL,
        headers: {
          'Content-Type': 'application/xml',
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
        responseType: 'arraybuffer',
        body: xmlData,
      }
    );

    request(requestConfig, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("index.js에서 TTS response.statusCode:",response.statusCode);
      console.log("index.js에서 TTS body: ",body); //WoW
      console.log("index.js에서 TTS res typeof: ",typeof res); //WoW
      //console.log("index.js에서 TTS res: ",res); //WoW
      response.send(res);


    });
  });


});