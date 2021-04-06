const mongoose = require("mongoose");

const{DB_HOST, DB} = process.env;
const MONGODB_URI = `mongodb://${DB_HOST}/${DB}` //Url de db

const coneccionBd = async () =>{
    try {
        await mongoose.connect(MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true
        })
        console.log("Database conected");

    } catch (err) {
        console.log('Failed to connect to MongoDB',err)
    }
}

coneccionBd();