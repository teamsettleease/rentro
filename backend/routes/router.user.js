const { Router } = require("express");
const User = require("../models/model.user");
const passport = require("../config/passport");
const { createHmac, randomBytes } = require("crypto");
const sendEmail = require("../services/services.email");

const router = Router();

//handle sigin
router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);

    return res.cookie("token", token).render("home");
  } catch (err) {
    return res.render("signin", {
      error: "Incorrect password or email",
    });
  }
});

//handle signout
router.get("/signout", (req, res) => {
  req.logout?.((err) => {
    if (req.session)
      req.session.destroy(() => {
        res.clearCookie("token");
        res.clearCookie("connect.sid"); // Clear session cookie if present
        res.redirect("/user/signin");
      });
    else {
      res.clearCookie("token");
      res.clearCookie("connect.sid");
      res.redirect("/user/signin");
    }
  });
});

//handle signup
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  await User.create({
    fullName,
    email,
    password,
    role: role,
  });

  res.redirect("/user/signin");
});

//oauth section
// Google OAuth login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/signin" }),
  (req, res) => {
    if (!req.user.role) {
      req.session.tempUserId = req.user._id;
      return res.redirect("/user/select-role");
    }

    // Generate JWT token and set cookie
    const token =
      require("../services/services.authentication").generateUserToken(
        req.user
      );
    res.cookie("token", token).redirect("/");
  }
);

//route for selecting role for oauth
router.get("/select-role", (req, res) => {
  res.render("selectRole");
});

router.post("/select-role", async (req, res) => {
  const { role } = req.body;
  const userId = req.session.tempUserId;
  if (!userId) return res.redirect("/user/signin");

  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

  delete req.session.tempUserId;

  const token =
    require("../services/services.authentication").generateUserToken(user);
  res.cookie("token", token).redirect("/");
});

//handle forgetPassword
router.get("/forgot-password", (req, res) => {
  res.render("forgotPassword");
});

//creates token and sends mail
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.send("No user with that email.");
  }

  const token = randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetLink = `http://${req.headers.host}/user/reset-password?token=${token}`;

  const message = `We have received a password reset request. Please use the below link to reset your password \n\n${resetLink}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request received",
      message: message,
    });
    return res.render("forgotPassword", {
      message: "Reset link sent to your email.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.log("failed to send mail", err);
    return res.render("forgotPassword", {
      error: "Failed to send reset email. Please try again.",
    });
  }
});

//handle post request with token value
router.get("/reset-password", async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.render("resetPassword", { error: "Invalid or expired token." });
  }
  res.render("resetPassword", { token });
});

//handles the updated password provided by the user
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.render("reset-password", { error: "Invalid or expired token." });
  }
  
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.redirect("/user/signin");
});

module.exports = router;
