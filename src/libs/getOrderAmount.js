const Product = require("../models/Product/Product");


getOrderAmount = async (products) => {
    let amount = 0;

    for (let i = 0; i < products.length; i++) {
        /*
        const productFound = await Subproduct.findById(products[i].product.subproduct._id);
        const value = productFound.price * products[i].qty;
        amount += value; */
    }

    return amount;
}


exports.getOrderAmount = getOrderAmount;