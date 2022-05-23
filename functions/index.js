const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require('cors')({ origin: true });

app.use(express.json()); // body-parser 설정 
// app.use("/api", movieApp);

exports.apicall = functions.region("asia-northeast3").https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
