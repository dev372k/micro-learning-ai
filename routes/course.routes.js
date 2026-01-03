const express = require("express");
const {
    create, remove, get
} = require("../controllers/course.controller.js");
const {
    getCourseContent, markAsDone, getByDay
} = require("../controllers/content.controller.js");
const {
    authGuard, authorizeRoles
} = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Course Routes
router.get("/", authGuard, get);
router.post("/", authGuard, create);
router.delete("/:id", authGuard, remove);

// Content Routes
router.get("/:id/content", authGuard, getCourseContent);
router.get("/:id/content/:day", authGuard, getByDay);
router.put("/:id/content/:contentId", authGuard, markAsDone);

module.exports = router;
