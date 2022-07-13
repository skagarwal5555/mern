const express = require("express");
const bodyParser = require("body-parser");
const courselist = require("./routes/courselist");
const enquiries = require("./routes/enquiries");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Express auth demo API works!" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/courselist", courselist);
app.use("/enquiries", enquiries);

app.listen(PORT, (req, res) => {
  console.log(`Express server listening on PORT ${PORT}`);
});
