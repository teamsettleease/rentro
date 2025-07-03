const JWT = require("jsonwebtoken");

function generateUserToken(user){
    const SECRET = process.env.SECRET; 
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        fullName: user.fullName
    }
    const token = JWT.sign(payload, SECRET);
    return token;
}

function validateToken(token) {
    const SECRET = process.env.SECRET;
    try {
        const payload = JWT.verify(token, SECRET);
        return payload;
    } catch (err) {
        console.error("Token Validation Error:", err.message);
        throw err;
    }
}

module.exports = {
    generateUserToken,
    validateToken
}