const express = require("express");
require('dotenv').config();
const path = require("path");
const cookieParser = require("cookie-parser");

const connectToMongoDb = require("./connect.js");
const bookingRoute = require("./routes/route.booking.js");
const ballingRoute = require("./routes/route.balling.js");
const userRoute = require("./routes/router.user.js");
const landlordRoute = require("./routes/route.landlordProperty.js");
const listAllProperties = require("./routes/route.listProperties.js");
const { checkForAuthenticationCookie, restrictToLoggedInUser, restrictToRole } = require("./middlewares/middleware.authentication");
const passport = require('./config/passport.js')
const session = require("express-session");


const app = express();
const PORT = process.env.PORT;

//database connection 
connectToMongoDb(process.env.MONGOOSEURL)
.then(()=> console.log("Database Connected"));


//middleware for ejs frontend
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//middleware for data coming from frontend
app.use(express.urlencoded({extended:false})); //for form data
app.use(express.json()); //for json data or url hits
//for css file in public
app.use(express.static(path.join(__dirname, 'public')));

//for cookies 
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));



//for google oauth
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// Middleware to make user available in all views
app.use((req, res, next) => {
    // console.log(req.user);
    res.locals.user = req.user;
    next();
});


//routes
app.use("/properties", restrictToLoggedInUser("token"), listAllProperties)
app.use("/booking",restrictToLoggedInUser("token"), bookingRoute);
app.use("/balling",restrictToLoggedInUser("token"), ballingRoute);
app.use("/landlord",restrictToLoggedInUser("token"),restrictToRole("Landlord"), landlordRoute)
app.use("/user", userRoute);


app.get("/", (req, res)=>{
    return res.render("home");
})

app.listen(PORT, ()=>{
    console.log(`Server running at port:${PORT}`);
})


