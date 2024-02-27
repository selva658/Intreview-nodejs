const Admin = require("../../schema/admin/admin.schema")
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../configs/jwt');

const jwt = require("jsonwebtoken");

const admin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await Admin.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password != password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const tokenPayload = {
            id: user._id,
            name: username,
            email: user.email,
            isAdmin: true
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Return the token to the client
        res.json(tokenPayload);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports={admin}