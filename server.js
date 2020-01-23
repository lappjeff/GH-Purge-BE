const express = require("express");
const passport = require("passport");
const session = require("./config/sessionConfig");
const authRouter = require("./routes/auth/authRoutes");

const app = express();

// Session config
app.use(session);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.status(200).send({ message: "Server running successfully!" });
});

app.listen(port, () => console.info(`App listening on port ${port}`));
