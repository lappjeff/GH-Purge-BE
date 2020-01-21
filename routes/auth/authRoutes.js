require("dotenv").config();
const router = require("express").Router();

router.get("authTest", async (req, res) => {
	try {
		res.status(200).json({ message: "Auth routes connected" });
	} catch (err) {
		res.status(500).end();
	}
});
