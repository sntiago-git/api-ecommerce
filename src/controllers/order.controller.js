orderCtrl = {};

const { Order } = require("../models");
const { getOrderAmount } = require("../libs/getOrderAmount");

const query_populate = [
    {
        path: 'user',
        select: {
            name: 1,
            email: 1,
            _id: 0
        }
    },

    {
        path: 'products',
        select: {
            _id: 0
        }
    },

    {
        path: 'products.product',
        select: {
            _id: 0,
            sku: 1,
            description: 1,
            price: 1
        }
    }
];


orderCtrl.getOrders = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query

    try {

        const [total, listOrders] = await Promise.all([
            Order.countDocuments(),
            Order.find()
                .populate(query_populate)
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listOrders })
        else res.status(404).send("no orders found")

    } catch (error) {
        res.status(400).json(error);
    }
};



orderCtrl.getOrder = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id).populate(query_populate);

        if (order) {
            res.json(order);
            console.log("orden solicitada: ", order)
        } else {
            res.status(404).json("Order not found");
        }

    } catch (error) {
        res.status(400).json(error);
    }
};




orderCtrl.addOrder = async (req, res) => {

    const { user, products} = req.body;
    const IVA = process.env.IVA;

    const subtotal = await getOrderAmount(products);
    const total_value = subtotal + ((subtotal * IVA) / 100);

    const newOrder = new Order({ user, products, subtotal, IVA, total_value });
    const savedOrder = await newOrder.save();

    res.json(savedOrder);
    console.log("venta hecha: ", savedOrder);
};



module.exports = orderCtrl;