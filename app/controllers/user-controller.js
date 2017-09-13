const db = require("../models");
const bCrypt = require('bcrypt-nodejs');

let user_exports = {};

user_exports.create = function(req, res) {
  let full_address = buildAddress(req.body);

  db.User.create({
    email: req.body.email,
    password: generateHash(req.body.password),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    full_address: full_address
  }).then(function (userRsp) {
    req.login(userRsp, function (err) {
      if (err) {
       throw err;
      }
      return res.redirect("/profile");
    });
  });
}

user_exports.show = function(req, res) {
  db.User.findOne({
    where: {
      email: req.user.email
    }
  })
  .then(function(userRsp) {
      res.render("profile", userRsp.dataValues);

    });
  }

user_exports.update = function (req, res) {
  console.log("==========================================");
  console.log("I'm in the PUT request");
  console.log("==========================================");

  console.log("==========================================");
  console.log("REQUEST BODY");
  console.log(req.body);
  console.log("==========================================");


  let full_address = buildAddress(req.body);

  let newAddress = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    full_address: full_address
  };

  console.log("==========================================");
  console.log("NEW ADDRESS");
  console.log(newAddress);
  console.log("==========================================");


  db.User.update(newAddress, {
    where: {
      email: req.user.email
    }
  }).then(function (userRsp) {
    console.log("==========================================");
    console.log(userRsp);
    console.log("==========================================");

    db.User.findOne({
      where: {
        email: req.user.email
      }
    }).then(function (userRsp) {
      res.json(userRsp);
    });
  });

  // db.User.findOne({
  //   where: {
  //     email: req.user.email
  //   }
  // }).then(function (userRsp) {
  //     let newAddress = {
  //       street: req.body.street,
  //       city: req.body.city,
  //       state: req.body.state,
  //       zipcode: req.body.zipcode,
  //       full_address: full_address
  //     };
  //
  //     userRsp.update(newAddress, {
  //       where: {
  //         email: req.user.email
  //       }
  //     }).then(function () {
  //       res.render("profile", userRsp.dataValues);
  //     });
  // });
}

function buildAddress(obj) {
  let address = obj.street + " " + obj.city + ", " + obj.state + " " + obj.zipcode;
  return address;
}

function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

//delete user

module.exports = user_exports;
