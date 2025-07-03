const { validateToken } = require("../services/services.authentication");


//middleware for the checking the cookies with every request
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (err) {
            console.error("Invalid token:", err.message);
        }

        next();
    };
}


//middleware for checking loggedin users
function restrictToLoggedInUser(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        
        if (!tokenCookieValue) {
            return res.redirect("/user/signin");
        }

        try {
            const userPayload = validateToken(tokenCookieValue); // Validate the token
            req.user = userPayload; // Attach the user payload to the request
        } catch (err) {
            console.error("Invalid or expired token:", err.message);
            return res.redirect("/user/signin"); // Redirect if the token is invalid
        }

        next(); 
    };
}


function restrictToRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) { // Compare req.user.role with the role parameter
            return next();
        }

        return res.redirect("/"); // Redirect if the user does not have the required role
    };
}

module.exports = {
  checkForAuthenticationCookie,
  restrictToLoggedInUser,
  restrictToRole
};
