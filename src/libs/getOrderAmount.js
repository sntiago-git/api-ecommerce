const Product = require("../models/Product/Product");


getOrderAmount = async (products) => {
    let amount = 0;
    console.log(products)
    for (let i = 0; i < products.length; i++) {
        
        let id = products[i].product;
        const productFound = await Product.findById(id);
        const value = productFound.price * products[i].qty;
        amount += value; 
    }

    return amount;
}


exports.getOrderAmount = getOrderAmount;