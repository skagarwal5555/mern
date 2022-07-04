process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Users = require("../app/models/users");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    Users.remove({}, (err) => {
      done();
    });
  });
  describe("/GET Users", () => {
    it("it should GET all the Users", (done) => {
      chai
        .request(server)
        .get("/Users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST Users", () => {
    it("it should not POST a User without mandatory field", (done) => {
      let user = {
        username : "skragarwal",
        email: "skragarwal@juju.com"
      };
      chai
        .request(server)
        .post("/Users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("address1");
          res.body.errors.address1.should.have.property("kind").eql("required");
          done();
        });
    });
    it("it should POST an User ", (done) => {
      let user = {
        username : "skragarwal",
        email: "skragarwal@juju.com",
        address1: "1954 S western"
      };
      chai
        .request(server)
        .post("/Users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("User successfully added!");
          res.body.User.should.have.property("username");
          res.body.User.should.have.property("email");
          res.body.User.should.have.property("address1");
          done();
        });
    });
  });
  describe("/GET/:id Users", () => {
    it("it should GET an User by the given id", (done) => {
      let user = new Users({
        username : "Manish new",
        email: "manishnew@juju.com",
        address1: "1954 S western"
      });
      user.save((err, User) => {
        chai
          .request(server)
          .get("/Users/" + User.id)
          .send(User)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("username");
            res.body.should.have.property("email");
            res.body.should.have.property("address1");
            res.body.should.have.property("_id").eql(User.id);
            done();
          });
      });
    });
  });
  describe("/PUT/:id User", () => {
    it("it should UPDATE a User given the id", (done) => {
      let user = new Users({
        username : "Manish new save",
        email: "manishnew@juju.com",
        address1: "1954 S western"
      });
      user.save((err, User) => {
        chai
          .request(server)
          .put("/Users/" + User.id)
          .send({
            username : "Manish new save",
            email: "manishnew@juju.com",
            address1: "1954 S western Amarillo"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("User updated!");
            res.body.User.should.have.property("address1").eql("1954 S western Amarillo");
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id User", () => {
    it("it should DELETE a User given the id", (done) => {
      let user = new Users({
        username : "Manish new delete",
        email: "manishnew@juju.com",
        address1: "1954 S western"
      });
      user.save((err, User) => {
        chai
          .request(server)
          .delete("/Users/" + User.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("User successfully deleted!");
            res.body.result.should.have.property("acknowledged").eql(true);
            res.body.result.should.have.property("deletedCount").eql(1);
            done();
          });
      });
    });
  });
});
