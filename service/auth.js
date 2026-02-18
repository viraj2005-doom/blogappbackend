const jwt = require('jsonwebtoken');
const secret = "anakinskywalker12345";

function createtokenforuser(user) { //user object lese ane token banavse 
    const payload = {
        id: user._id,
        email: user.email,
        profileimageurl : user.profileImageURL,
        role: user.role,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '24h' });    
    return token;
}

function verifytokenforuser(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.log("Token verification failed", err);
        return null;
    }
}

module.exports = {
    createtokenforuser,
    verifytokenforuser
}
