var orm = require("../config/orm");

module.exports = function (app) {
  app.get("/api/items", function (req, res) {
    orm.selectAll(res, 'Item');
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
    orm.checkUser(req, res, 'User');
  });
};
