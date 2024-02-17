const jwt = require('jsonwebtoken');


const SECRET_KEY = "appzlogicmobilitysolutionpvtltd";
let tokenBlacklist = []; // Maintain a blacklist of tokens

const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            // for logout
            if (tokenBlacklist.includes(token)) {
                return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
            }
            req.userId = user.id;

        } else {
            res.status(401).json({message: "Unauthorized User"})
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized User"})
    }
}

module.exports = auth;