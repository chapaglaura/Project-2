var db = require("../models");

var tableName = "Items";

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
    })
  }
};


module.exports = orm;
