var db = require("../models");

var orm = {

  selectAll(res, model) {
    db[model].findAll({}).then(function (data) {
      res.json(data);
    });
  },

  createRow(req, res, model) {
    db[model].create(req.body).then(function (data) {
      res.json(data);
    });
  },

  updateRow(req, res, model) {
    var id = req.body.id;
    var col = req.body.col;
    var value = req.body.value;
    console.log(id, col);
    db[model].update({
      [col]: value
    }, {
        where: {
          id: id
        }
      }).then(function (data) {
        res.json(data);
      });
  },

  deleteRow(req, res, model) {
    var id = req.body.id;
    db[model].destroy({
      where: {
        id: id
      }
    }).then(function (data) {
      res.json(data);
    });
  },

  checkUser(req, res, model) {
    var username = req.body.username;
    var password = req.body.password;
    db[model].findOne({
      where: {
        username: username,
        password: password
      }
    }).then(function (data) {
      res.json(data);
      console.log(data, 'sent!!!!!');
    });
  },

  createUser(req, res, model) {
    var username = req.body.username;
    var password = req.body.password;
    db[model].findOne({
      where: {
        username: username
      }
    }).then(function (data) {
      console.log('User exists');
      res.json(data);
    }).catch(function (data) {
      db[model].create(req.body)
        .then(function (data) {
          console.log('User created');
          res.json(data);
        })
    });
  }
};

module.exports = orm;
