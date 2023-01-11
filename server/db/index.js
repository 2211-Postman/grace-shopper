//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderDetails = require("./models/OrderDetails");

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderDetails);
OrderDetails.belongsTo(Order);
OrderDetails.hasMany(Product);
Product.belongsTo(OrderDetails);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderDetails,
  },
};
