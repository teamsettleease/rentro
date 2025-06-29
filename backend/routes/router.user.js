const { Router } = require("express");
const User = require("../models/model.user");
const passport = require('../config/passport');

const router = Router();

//handle sigin
router.get('/signin', (req, res)=>{
    return res.render("signin" );
})

router.post("/signin", async (req, res)=>{
    const {email, password } = req.body;
    try{
        const token = await User.matchPasswordandGenerateToken(email, password);

        return res.cookie("token", token).render("home");
    }catch(err){
        return res.render("signin",{
            error: "Incorrect password or email"
        });
    }
})

//handle signout
router.get("/signout", (req, res) => {
    req.logout?.(err => {
        if (req.session) req.session.destroy(() => {
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
router.get('/signup', (req, res) =>{
    return res.render("signup");
})

router.post('/signup', async (req, res)=>{
    const {fullName, email, password, role} = req.body;
    await User.create({
        fullName,
        email,
        password,
        role: role 
    })

    res.redirect("/user/signin");
})


// Google OAuth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/signin" }),
  (req, res) => {

    if(!req.user.role){
        req.session.tempUserId = req.user._id;
        return res.redirect("/user/select-role");
    }

    // Generate JWT token and set cookie
    const token = require("../services/services.authentication").generateUserToken(req.user);
    res.cookie("token", token).redirect("/");
  }
);



//route for selecting role for oauth
router.get('/select-role', (req, res) =>{
    res.render("selectRole");
})

router.post('/select-role', async (req, res) =>{
    const { role } = req.body;
    const userId = req.session.tempUserId;
    if (!userId) return res.redirect("/user/signin");

    const user = await User.findByIdAndUpdate(userId, {role}, {new: true});

    delete req.session.tempUserId;

    const token = require("../services/services.authentication").generateUserToken(user);
    res.cookie("token", token).redirect("/");

})


module.exports = router;