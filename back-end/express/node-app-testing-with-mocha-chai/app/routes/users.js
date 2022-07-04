let mongoose = require("mongoose");
let Users = require("../models/users");

/*
 * GET /users route to retrieve all the users.
 */
function getUsers(req, res) {
  //Query the DB and if no errors, send all the users
  let query = Users.find({});
  query.exec((err, users) => {
    if (err) res.send(err);
    //If no errors, send them back to the client
    res.json(users);
  });
}

/*
 * POST /users to save a new User.
 */
function postUser(req, res) {
  //Creates a new User
  var newUser = new Users(req.body);
  //Save it into the DB.
  newUser.save((err, User) => {
    if (err) {
      res.send(err);
    } else {
      //If no errors, send it back to the client
      res.json({ message: "User successfully added!", User });
    }
  });
}

/*
 * GET /users/:id route to retrieve a User given its id.
 */
function getUser(req, res) {
  Users.findById(req.params.id, (err, User) => {
    if (err) res.send(err);
    //If no errors, send it back to the client
    res.json(User);
  });
}

/*
 * DELETE /users/:id to delete a User given its id.
 */
function deleteUser(req, res) {
  Users.remove({ _id: req.params.id }, (err, result) => {
    res.json({ message: "User successfully deleted!", result });
  });
}

/*
 * PUT /users/:id to update an User given its id
 */
function updateUser(req, res) {
  Users.findById({ _id: req.params.id }, (err, User) => {
    if (err) res.send(err);
    Object.assign(User, req.body).save((err, User) => {
      if (err) res.send(err);
      res.json({ message: "User updated!", User });
    });
  });
}

//export all the functions
module.exports = { getUsers, postUser, getUser, deleteUser, updateUser };
