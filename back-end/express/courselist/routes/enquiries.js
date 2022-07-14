const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const fs = require("fs");
const { STATUS_CODES } = require("http");

router.post(
  "/Add",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("enquiry", "Please enter atleast one character in enquiry")
      .not()
      .isEmpty(),
    check("cid", "CourseId Missing").not().isEmpty(),
  ],
  async (req, res) => {
    console.log("Start Validation");
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, email, enquiry, cid } = req.body;

    let newEnquiry = {
      username: username,
      email: email,
      enquiry: enquiry,
      cid: cid,
    };

    let enquiries = [];
    fs.readFile("./data/enquiries.json", (err, data) => {
      if (err) throw err;
      console.log("data:" + data);
      if (data != "") {
        console.log("Getting existing data");
        enquiries = JSON.parse(data);
      }

      enquiries.push(newEnquiry);

      fs.writeFile(
        "./data/enquiries.json",
        JSON.stringify(enquiries, null, 2),
        (err) => {
          if (err) throw err;
          res.set("Access-Control-Allow-Origin", "*");
          res.status(200).send({ message: "Success" });
        }
      );
    });
    console.log("This is after the write call");
  }
);

router.get("/", async (req, res) => {
  try {
    let enquiries = [];
    fs.readFile("./data/enquiries.json", (err, data) => {
      if (err) throw err;
      if (data != "") {
        enquiries = JSON.parse(data);
      }
      res.setHeader("Content-Type", "application/json");
      res.set("Access-Control-Allow-Origin", "*");
      res.end(JSON.stringify(enquiries));
    });
  } catch (e) {
    res.send({ message: "Error in Fetching enquiries" });
  }
});

module.exports = router;
