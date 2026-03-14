const mongoose = require('mongoose');

const DBConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB is connected successfully");
    }
    catch(err) {
        console.log("MONGODB is not connected");
    }
}

module.exports = DBConnect;