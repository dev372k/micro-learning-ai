const Content = require('../models/content.model.js');
const asyncHandler = require('../middlewares/asyncHandler.js');
const { successResponse, errorResponse } = require('../utils/response.js');

const getCourseContent = asyncHandler(async (req, res) => {
    const course = req.params.id;
    const content = await Content.find({ course });
    successResponse(res, content);
});

module.exports = {
    getCourseContent
};