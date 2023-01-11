const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("order", {
  purchased: {
    type: Sequelize.BOOLEAN,
  },
});
