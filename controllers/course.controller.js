const Course = require('../models/course.model.js');
const Content = require('../models/content.model.js');
const asyncHandler = require('../middlewares/asyncHandler.js');
const { successResponse, errorResponse } = require('../utils/response.js');
const { generateCourse } = require('../utils/ai.js');

const create = asyncHandler(async (req, res) => {
    const { title, duration } = req.body;
    const course = new Course({
        title,
        duration,
        user: req.user.id,
    });
    
    await generateCourse(title, duration).then(async (contents) => {
        for (let day = 1; day <= contents.length; day++) {
            const contentData = contents[day - 1];
            const content = new Content({
                title: contentData.title,
                day,
                content: contentData.content,
                course: course._id,
            });
            await content.save();
        }
    });

    await course.save();
    successResponse(res, message = 'Course created successfully');
});

const get = asyncHandler(async (req, res) => {
    const courses = await Course.find({ user: req.user.id });
    successResponse(res, courses);
});

const remove = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);
    successResponse(res, message = 'Course removed successfully');
});

module.exports = {
    create,
    remove,
    get
};