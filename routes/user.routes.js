const express = require("express");
const {
    getUserProfile
} = require("../controllers/user.controller.js");

const {
    authGuard, authorizeRoles
} = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.get("/get-user", getUserProfile);

module.exports = router;
