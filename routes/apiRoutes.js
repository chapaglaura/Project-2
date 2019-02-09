var orm = require("../config/orm");
var db = require("../models");

const uuidv4 = require('uuid/v4');

module.exports = function (app) {
  app.get("/api/items", function (req, res) {
    orm.selectAll(req, res, 'Item');
  });

  // Create a new example
  app.post("/api/items", function (req, res) {
    orm.createRow(req, res, 'Item');
  });

  app.put('/api/items', function (req, res) {
    orm.updateRow(req, res, 'Item');
  });

  app.delete('/api/items', function (req, res) {
    orm.deleteRow(req, res, 'Item');
  });

  app.get('/api/userlogin', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    db['User'].findOne({
      where: {
        username: username,
        password: password
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  app.get('/api/usersignup', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var user_id = uuidv4();
    console.log(req.query);
    db['User'].findOne({
      where: {
        username: username
      }
    }).then(function (data) {
      if (data === null) {
        db['User'].create({
          username: username,
          password: password,
          user_id: user_id
        }).then(function (data) {
          console.log('if')
          res.json(data);
        })
      }
      else {
        console.log('else');
        res.json({exists: true});
      }
    });
  });
};
