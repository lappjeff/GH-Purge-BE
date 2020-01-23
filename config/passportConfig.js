require("dotenv").config();
const passport = require("passport");
const GHStrategy = require("passport-github").Strategy;

const clientID = process.env.AUTH_CLIENT_ID;
const clientSecret = process.env.AUTH_SECRET;
const callbackURL = process.env.AUTH_CALLBACK;

// called after CB used in strategy setup below
passport.serializeUser((user, done) => {
	// passes data to deserializeUser through 2'nd done param
	// this is the data that will be stored on the session
	done(null, {
		accessToken: user.accessToken,
		id: user.profile.id,
		username: user.profile.username
	});
});

passport.deserializeUser((user, done) => {
	// this sets the data on req.user
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
			// passes data to serializeUser
			return done(null, { accessToken, profile });
		}
	)
);

module.exports = passport;
