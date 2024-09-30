const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send("Token error");
    }
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send("Authentication failed");
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied. Admin only.");
  }
  next();
};

const governmentAuth = (req, res, next) => {
  if (req.user.role !== 'government_official' || !req.user.isApproved) {
    return res.status(403).send("Access denied.Approved Government officials or admin only.");
  }
  next();
};

const startupAuth = (req, res, next) => {
  if (req.user.role !== 'startup') {
    return res.status(403).send("Access denied. Only startups can access this resource.");
  }
  next();
};

const approvalAuth = (req, res, next) => {
  if (req.user.role === 'government_official' && !req.user.isApproved) {
    return res.status(403).send("Access denied. Only approved government officials can approve startups.");
  }
  if (!req.user.isAdmin && req.user.role !== 'government_official') {
    return res.status(403).send("Access denied. Only government officials or admins can approve startups.");
  }
  next();
};

module.exports = { auth, adminAuth, startupAuth, governmentAuth, approvalAuth };