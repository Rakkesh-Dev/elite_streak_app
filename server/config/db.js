const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
    "mongodb+srv://dmrakkeshofficial_db_user:R%40kkesh898079%24@elitestreakapp.7xxs99s.mongodb.net/eliteStreakDB?retryWrites=true&w=majority"
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
