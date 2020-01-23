const express = require("express");
const passport = require("passport");
const connectDB = require("./db/connectDb");
const session = require("./config/sessionConfig");
const authRouter = require("./routes/auth/authRoutes");

const app = express();

// MongoDB connection
connectDB();

// Session config
app.use(session);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send({ message: "Server running successfully!" }).status(200);
});

app.listen(port, () => console.info(`App listening on port ${port}`));
