const jwt = require('jsonwebtoken');
const WHITELIST_URLS = ['/api/users/login', '/api/users/register'];

function verifyJWT_MW(req, res, next) {
    if (WHITELIST_URLS.includes(req.originalUrl)) {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers.token;

        verifyJWTToken(token)
            .then((decodedToken) => {
                req.user = decodedToken.data;
                next();
            })
            .catch((err) => {
                res.status(400)
                    .json({message: "Invalid auth token provided."})
            })
    }
}

function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "JWT_SECRET", (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

function createJWToken({ data, maxAge = 3600 }) {
    return jwt.sign({ data }, "JWT_SECRET", { expiresIn: maxAge, algorithm: 'HS256' });
}

module.exports = {createJWToken, verifyJWT_MW};
