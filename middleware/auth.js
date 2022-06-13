const jwt = require('jsonwebtoken');
const User = require('../models/User.model');


const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;