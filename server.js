const express = require("express");
const passport = require("passport");
require("dotenv").config();

const authRouter = require("./routes/auth/authRoutes");

const app = express();

app.use(express.json());
app.use(passport.initialize());

//Routes
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send({ message: "Server running successfully!" }).status(200);
});

app.listen(port, () => console.info(`App listening on port ${port}`));
