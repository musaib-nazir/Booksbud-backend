const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    console.log("Db connected ");
  } catch (error) {
    console.log(error);
  }
};




module.exports = connectDB