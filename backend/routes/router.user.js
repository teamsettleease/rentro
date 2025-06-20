const { Router } = require("express");
const User = require("../models/model.user");

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
router.get("/signout", (req, res)=>{
    res.clearCookie("token").redirect("/user/signin");
})


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
        role
    })

    res.redirect("/user/signin");
})


module.exports = router;