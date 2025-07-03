const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/model.user");
const { randomBytes } = require("crypto");
const sendEmail = require("../services/email");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ email: profile.emails[0].value });
      let otp;
      if (!user) {
        otp = Math.floor(100000 + Math.random() * 900000).toString();
        user = await User.create({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profileImageUrl: profile.photos[0].value,
          password: randomBytes(16).toString("hex"),
          role: null,
          isEmailVerified: false,
          emailVerificationOTP: otp,
          emailVerificationExpires: Date.now() + 10 * 60 * 1000,
        });

        // Send OTP email
        await sendEmail({
          email: user.email,
          subject: "Your OTP Code",
          message: `Hi ${user.fullName},\n\nYour OTP code is: ${otp}\n\nIt is valid for 10 minutes.`,
        });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
