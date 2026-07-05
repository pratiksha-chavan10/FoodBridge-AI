//JWT Authentication MIddle ware
//It acts like a security guard
// It checks if the user is allowed to access the API or not

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        console.log("Middleware started");
        // 1. Get token from header
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token, access denied"
            });
        }

        // 2. Remove "Bearer "
        const actualToken = token.split(" ")[1];

        // 3. Verify token
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        console.log("Token verified");
        console.log(decoded);
        // 4. Attach user info to request
        req.user = decoded;

        // 5. Move to next function (controller)
        console.log("Calling next()");
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;