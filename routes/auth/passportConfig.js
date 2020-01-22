require("dotenv").config();
const passport = require("passport");
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

module.exports = passport;
