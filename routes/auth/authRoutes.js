require("dotenv").config();
const router = require("express").Router();
const qs = require("querystring");
const passport = require("../../config/passportConfig");
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
	const data = req.user;

	res.status(200).json({
		message: "Successfully logged into GH",
		data
	});
});

const checkAuth = (err, req, res, next) => {
	if (req.isUnauthenticated()) {
		console.log("unauthenticated");

		res.status(401).json({ message: "User not authenticated" });
		next();
	} else {
		next();
	}
};

router.get("/github/checkAuth", checkAuth, (req, res) => {
	res.status(200).json({
		data: req.user,
		message: "Data persisted successfully. Great JOB!"
	});
});

module.exports = router;
