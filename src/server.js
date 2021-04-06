const express = require ("express");
require('dotenv').config();
const {createRoles} = require("./libs/initialSetup");

const app = express();
createRoles(); //Se inicializan los roles 

//Routes
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const categoryRoutes = require ("./routes/category.routes")

app.get("/",(req,res)=>{
    res.send("Cajú api")
})


//Settings

app.set("port", process.env.PORT || 4000);

//Middlewares

//app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Path
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/category", categoryRoutes);



module.exports = app
