require("dotenv").config();
const passport = require("passport");
const GHStrategy = require("passport-github").Strategy;

const clientID = process.env.AUTH_CLIENT_ID;
const clientSecret = process.env.AUTH_SECRET;
const callbackURL = process.env.AUTH_CALLBACK;

// called after CB used in strategy setup below
passport.serializeUser((user, done) => {
	// passes data to deserializeUser through 2'nd done param
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
			// done in this case passes given data to serializeUser
			return done(null, { accessToken, profile });
		}
	)
);

module.exports = passport;
