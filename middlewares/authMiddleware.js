const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response.js");

require("dotenv").config();

// ✅ Authenticate JWT
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Unauthorized access", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // attach user info (id, email, role, etc.)
    next();
  } catch (err) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};

// ✅ Role-based guard
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, "Unauthorized access", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, "Forbidden: Access denied", 403);
    }

    next();
  };
};

module.exports = { authGuard, authorizeRoles };
