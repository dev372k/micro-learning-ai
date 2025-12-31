const getUserProfile = (req, res) => {
    const userId = req.query.id; 
    res.json({ message: `User profile data for user id: ${userId}` });
};


module.exports = { getUserProfile };