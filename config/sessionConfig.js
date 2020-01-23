require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//Sessions
const store = new MongoDBStore(
	{
		uri: process.env.MONGO_DB_URI,
		collection: "sessions"
	},
	err => {
		if (err) console.log(err);
	}
);

store.on("error", err => {
	console.log(err);
});

module.exports = session({
	secret: process.env.SESSION_SECRET,
	cookie: {
		// cookie expires in 1 day
		maxAge: 86400000
	},
	store,
	resave: true,
	saveUninitialized: false
});
