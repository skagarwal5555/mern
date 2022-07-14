var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    console.log("Start Reading File");
    fs.readFile("./data/courselist.json", (err, data) => {
      if (err) throw err;
      let courses = JSON.parse(data);
      console.log(courses);
      res.setHeader("Content-Type", "application/json");
      res.set('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(courses));
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching enquiries" });
  }
});

module.exports = router;
