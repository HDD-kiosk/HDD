const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const multer = require("multer");
const fs = require("fs");

var test = require("./router/test");

app.use(cors());
app.use(bodyParser.json());

app.use("/test", test);

app.listen(port, () => {
  const dir = "./uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`express is running on ${port}`);
});


