const mongoose = require("mongoose");

const config = require("./config");

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoCloud, config.options);
    console.log("Mongo DB Connected Successfully");
  } catch (err) {
    console.log(err);
    console.log("Error in connecting to Mongo DB");
  }
};

connectDb();
