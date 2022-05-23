const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require('cors')({ origin: true });

// 어드민 초기화. 클라우드 함수, 호스팅만 사용할 경우 따로 설정파일을 넘겨주지 않아도 됨
admin.initializeApp();
app.use(express.json()); // body-parser 설정 
const HDD = express.Router();
// app.use('/api', HDD);

const db = admin.firestore();

exports.apicall = functions.region("asia-northeast3").https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
