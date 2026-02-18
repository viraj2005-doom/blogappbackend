const { verify } = require("jsonwebtoken");
const { verifytokenforuser } = require("../service/auth");

function checkforauth(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = verifytokenforuser(tokenCookieValue);
            req.user = {
                ...userPayload,
                _id: userPayload._id || userPayload.id
            };
        } catch (error) {
            console.log("Token verification error:", error);
        }
        
        return next();
    }
}

module.exports = {
    checkforauth
}