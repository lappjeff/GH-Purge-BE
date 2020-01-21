const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send({ message: "Server running successfully!" }).status(200);
});

app.listen(port, () => console.info(`App listening on port ${port}`));
