require("dotenv").config();
const passport = require("passport");
const router = require("express").Router();
const GHStrategy = require("passport-github").Strategy;

const clientID = process.env.AUTH_CLIENT_ID;
const clientSecret = process.env.AUTH_SECRET;
const callbackURL = process.env.AUTH_CALLBACK;

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const scopes = ["user"];

passport.use(
	new GHStrategy(
		{
			clientID,
			clientSecret,
			callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			return done(null, { accessToken, refreshToken, profile });
		}
	)
);

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
