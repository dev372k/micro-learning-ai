const express = require("express");
const {
    get, getById, signup, login
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
