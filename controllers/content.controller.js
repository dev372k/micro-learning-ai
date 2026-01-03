const Content = require('../models/content.model.js');
const Course = require('../models/course.model.js');
const asyncHandler = require('../middlewares/asyncHandler.js');
const { successResponse, errorResponse } = require('../utils/response.js');

const getCourseContent = asyncHandler(async (req, res) => {
    const course = req.params.id;
    const content = await Content.find({ course });
    successResponse(res, content);
});

const getByDay = asyncHandler(async (req, res) => {
    const content = await Content.findOne({
        course: req.params.id,
        day: Number(req.params.day)
    });

    if (!content) {
        return errorResponse(res, "Content not found for this course and day");
    }

    successResponse(res, content);
});

const markAsDone = asyncHandler(async (req, res) => {
    const course = await Course.findOne({
        _id: req.params.id,
    });

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const content = await Content.findOne({
        _id: req.params.contentId,
        course: req.params.id
    });

    if (!content) {
        return res.status(404).json({ message: "Content not found" });
    }

    if (!content.isDone) {
        content.isDone = true;
        await content.save();

        if (course.progress !== course.duration) {
            course.progress += 1
            await course.save();
        }
    }

    successResponse(res, content, message = "Marked as done.");
});

module.exports = {
    getCourseContent,
    getByDay,
    markAsDone,
};