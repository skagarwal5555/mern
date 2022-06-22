var express = require('express');
var router = express.Router();

const User = require("../model/User");

/* GET users listing. */
router.get('/', async (req, res) =>  {
  var allRecords = await User.find({});
  console.log(allRecords);
  res.render('adminDash', { "order_list": allRecords });
});

router.post('/sendemail', async (req, res) =>  {
  console.log(req.body);
  var allRecords = await User.find({});
  res.render('adminDash', { "order_list": allRecords });
});

module.exports = router;


