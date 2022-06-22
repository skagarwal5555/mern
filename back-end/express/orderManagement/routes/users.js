var express = require('express');
const { check, validationResult } = require("express-validator/check");
var router = express.Router();

const User = require("../model/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', '');
});

router.post('/',
[
  check("username", "Please Enter a Username").not().isEmpty(),
  check("email", "Please Enter a Valid Email").isEmail(),
  check("address1", "Please Enter  address1").not().isEmpty(),
  check("city", "Please Enter  city").not().isEmpty(),
  check("zip", "Please Enter  zip").not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('users', { errors: errors.array() });
  }
  else
  {
  const { username, email, address1 , address2, city , zip , items } = req.body;
  console.log(req.body);
  try {

    user = new User({
      username,
      email,
      address1,
      address2,
      city,
      zip,
      items
    });

    await user.save();
  
    res.redirect('/');

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error in validating user!");
  }
}
}
);

module.exports = router;


