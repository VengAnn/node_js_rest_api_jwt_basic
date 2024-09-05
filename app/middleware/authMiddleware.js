const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Received Token:', token);

    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token has expired' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
            return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};
