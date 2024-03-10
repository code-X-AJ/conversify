const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Mango Connected!!!");
        })
    } catch (error) {
        console.error("Ohhhh A DB error"+error.message);
    }
}

module.exports = {mongoConnect}