require("dotenv").config();
const router = require("express").Router();
const qs = require("querystring");
const passport = require("./passportConfig");
const scopes = ["user", "delete_repo"];

router.get("/github", passport.authenticate("github", { scope: scopes }));

router.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/404" }),
	(req, res) => {
		const dataString = qs.stringify(req.user.profile);

		res.redirect(`success?${dataString}`);
	}
);

router.get("/github/success", (req, res) => {
	const data = req.query;

	res.status(200).json({
		message: "Successfully logged into GH",
		data
	});
});

module.exports = router;
