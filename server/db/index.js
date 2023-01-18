//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderDetails = require("./models/OrderDetails");

const Address = require("./models/Address");
const Payment = require("./models/Order");

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderDetails);
OrderDetails.belongsTo(Order);
OrderDetails.belongsTo(Product);
Product.hasMany(OrderDetails);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderDetails,
    Address,
    Payment,
  },
};
