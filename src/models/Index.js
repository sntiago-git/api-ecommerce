
//Product Folder
const Product = require("./Product/Product");
const Category = require("./Product/Category");
const Color = require("./Product/Color");
const Size = require("./Product/Size");
//const Price = require("./Product/Price");

//Main folder
const Order = require("./Order");
const Role = require("./Role");
const User = require("./User");


module.exports = {
    Product,
    Category,
    Color,
    Size,
    Order,
    Role,
    User
}