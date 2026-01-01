const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const asyncHandler = require('../middlewares/asyncHandler.js');
const { successResponse, errorResponse } = require('../utils/response.js');

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    successResponse(res, users);
});

const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    successResponse(res, user);
});

const signup = asyncHandler(async (req, res) => {
    const { username, email, password, preferredTopics } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
        errorResponse(res, message = 'User already exists');

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
        username,
        email,
        passwordHash: hashedPassword,
        preferredTopics
    });

    await user.save();

    successResponse(res, message = 'User registered successfully');
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
        errorResponse(res, message = 'User does not exist');

    // hash password
    const verifyHash = await bcrypt.compare(password, user.passwordHash);
    if (!verifyHash)
        errorResponse(res, message = 'Invalid credentials');

    // generate token
    const token = jwt.sign(
        { userId: user._id, role: user.role, username: user.username, email: user.email },
        process.env.JWT_SECRET_KEY || 'your_jwt_secret_key',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    successResponse(res, { token });
});

module.exports = { getUser, getUsers, signup, login };