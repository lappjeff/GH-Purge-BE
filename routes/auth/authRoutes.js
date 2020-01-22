require("dotenv").config();
const router = require("express").Router();
const passport = require("./passportConfig");
const scopes = ["user", "delete:packages"];

router.get("/github", passport.authenticate("github", { scope: scopes }));

router.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/404" }),
	(req, res) => {
		res.redirect("success");
	}
);

router.get("/github/success", (req, res) => {
	console.log(req);

	res.status(200).json({ message: "Successfully logged into GH" });
});

module.exports = router;
