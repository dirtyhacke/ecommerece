import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    let token = req.headers.authorization || req.headers.token;

    if (!token || typeof token !== 'string') {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    // If token is prefixed with "Bearer ", remove it
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return res.status(403).json({ success: false, message: 'Invalid token. Login again.' });
    }
};

export default authUser;
