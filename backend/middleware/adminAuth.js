import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.token || req.headers.authorization;

    if (!token) return res.status(401).json({ success: false, message: "Token missing!" });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Admin only!" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("Admin Auth Error:", err.message);
    return res.status(403).json({ success: false, message: "Token verification failed." });
  }
};

export default adminAuth;
