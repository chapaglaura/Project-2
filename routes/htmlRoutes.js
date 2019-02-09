var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "",
        examples: dbExamples
      });
    });
  });

  app.get("/items", function (req, res) {
    db.Item.findAll({}).then(function (data) {
      res.render("form", {
        items: data
      });
    });
  });


  app.get("/items/location/:loc", function (req, res) {
    var location = req.params.loc;
    location = location.split('_');
    for (var i = 0; i < location.length; i++) {
      location[i] = location[i].charAt(0).toUpperCase() + location[i].slice(1);
    }
    location = location.join(' ');
    db.Item.findAll({
      where: {
        location: location
      }
    }).then(function (data) {
      res.render("location", {
        items: data,
        location: location
      });
    });
  });


  app.get("/items/category/:cat", function (req, res) {
    var category = req.params.cat;
    category = category.split('_');
    for (var i = 0; i < category.length; i++) {
      category[i] = category[i].charAt(0).toUpperCase() + category[i].slice(1);
    }
    category = category.join(' ');
    db.Item.findAll({
      where: {
        category: category
      }
    }).then(function (data) {
      res.render("category", {
        items: data,
        category: category
      });
    });
  });

  app.get("/tiddytips", function (req, res) {
    res.render("tiddytips", {});
  });


  app.get("/routes", function (req, res) {
    res.render("form", {});
  });








  app.get("*", function (req, res) {
    res.render("404");
  });
};
