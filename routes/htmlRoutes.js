var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index", {});
  });

  app.get("/login", function (req, res) {
    res.render("login", {});
  });

  app.get("/signup", function (req, res) {
    res.render("signup", {});
  });

  app.get("/items/:id", function (req, res) {
    var id = req.params.id;
    db.Item.findAll({
      where: {
        user_id: id
      }
    }).then(function (data) {
      console.log('HEELLOOOO!!!!');
      res.render("form", {
        items: data
      });
    });
  });
  
  app.get("/items/:id/location/:loc", function (req, res) {
    var location = req.params.loc;
    var id = req.params.id;
    location = location.split('_');
    for (var i = 0; i < location.length; i++) {
      location[i] = location[i].charAt(0).toUpperCase() + location[i].slice(1);
    }
    location = location.join(' ');
    db.Item.findAll({
      where: {
        location: location,
        user_id: id
      }
    }).then(function (data) {
      res.render("location", {
        items: data,
        location: location
      });
    });
  });


  app.get("/items/:id/category/:cat", function (req, res) {
    var category = req.params.cat;
    var id = req.params.id;
    category = category.split('_');
    for (var i = 0; i < category.length; i++) {
      category[i] = category[i].charAt(0).toUpperCase() + category[i].slice(1);
    }
    category = category.join(' ');
    db.Item.findAll({
      where: {
        category: category,
        user_id: id
      }
    }).then(function (data) {
      res.render("category", {
        items: data,
        category: category
      });
    });
  });

  app.get("/tips", function (req, res) {
    res.render("tips");
  });

  app.get("*", function (req, res) {
    res.render("404");
  });
};
