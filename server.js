const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8881;
let projectData = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("website"));

app.post("/post/projectData", function (req, res) {
  console.log("post", req.body);
  projectData = { ...req.body };
  console.log("projectData", projectData);
  res.send("success");
});

app.get("/get/projectData", function (req, res) {
  console.log("get", projectData);
  res.send(projectData);
});

app.listen(port, function () {
  console.log(`server start http://127.0.0.1 ,port : ${port}`);
});
