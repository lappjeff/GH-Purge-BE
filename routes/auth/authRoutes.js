require("dotenv").config();
const router = require("express").Router();
const passport = require("../../config/passportConfig");
const scopes = ["user", "delete_repo"];

router.get("/github", passport.authenticate("github", { scope: scopes }));

router.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/404",
		successRedirect: "success"
	}),
	(req, res) => {}
);

router.get("/github/success", (req, res) => {
	const data = req.user;

	res.status(200).json({
		message: "Successfully logged into GH",
		data
	});
});

const checkAuthentication = (req, res, next) => {
	if (req.isUnauthenticated()) {
		// need to add checking for missing cookie as well
		// currently the cookie can be wiped and this will pass with no user data
		res.status(401).json({ message: "User not authenticated" });
	} else {
		next();
	}
};

router.get("/github/checkAuth", checkAuthentication, (req, res) => {
	res.status(200).json({
		data: req.user,
		isLoggedIn: true,
		message: "Data persisted successfully. Great JOB!"
	});
});

module.exports = router;
