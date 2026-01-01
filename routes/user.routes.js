const express = require("express");
const {
    getUser, getUsers, signup, login
} = require("../controllers/user.controller.js");

const {
    authGuard, authorizeRoles
} = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUsers);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
