require("dotenv").config();
const config = require("../config/mongoConfig");
const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI, config);
		console.log("MongoDB successfully started");
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDb;
