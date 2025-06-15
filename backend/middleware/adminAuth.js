import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Login again!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if it's an admin token
    if (decoded.role !== "admin") {
      return res.json({ success: false, message: "Not Authorized. Admin only!" });
    }

    next();
  } catch (error) {
    console.log("Admin Auth Error:", error.message);
    res.json({ success: false, message: "Token verification failed." });
  }
};

export default adminAuth;
