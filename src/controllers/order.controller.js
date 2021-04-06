orderCtrl = {};

const { Order } = require("../models");

const { getOrderAmount } = require("../libs/getOrderAmount");

const query = [

    {
        path: 'user',
        select: {
            name: 1,
            email: 1,
            _id: 0
        }
    },

    {
        path: 'products.product.product',
        select: {
            tittle: 1
        }
    },

    {
        path: 'products.product.subproduct',
        select: {
            sku: 1,
            images: 1,
            price: 1,
            size: 1,
            color: 1
        }
    }
];


orderCtrl.getOrders = async (req, res) => {
    try {
        const listOrders = await Order.find().populate(query);

        if (listOrders.length > 0) res.json(listOrders);
        else res.send("No orders found");

    } catch (error) {
        res.status(400).json(error);
    }
};



orderCtrl.getOrder = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id).populate(query);

        if (order) {
            res.json(order);
            console.log("orden solicitada: ", order)
        } else {
            res.status(404).json("product not found");
        }

    } catch (error) {
        res.status(400).json(error);
    }
};




orderCtrl.addOrder = async (req, res) => {

    const { user, products } = req.body;
    const IVA = process.env.IVA;

    const subtotal = await getOrderAmount(products);
    const total_value = subtotal + ((subtotal * IVA) / 100);

    const newOrder = new Order({ user, products, subtotal, IVA, total_value });
    const savedOrder = await newOrder.save();

    res.json(savedOrder);
    console.log("venta hecha: ", savedOrder);
};



module.exports = orderCtrl;