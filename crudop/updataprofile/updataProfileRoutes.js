const Notification = require("../../schema/admin/notification.schema");
const User = require("../../schema/users/user.schema");

// Requesting to edit
const updateProfile = async (req, res) => {
  try {
    const { username, email, password, id } = req.body;

    if (!username || !email || !password || !id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    let existingUser = await Notification.findOne({ email });
    if (existingUser) {
      // Update existing user profile
      await Notification.findOneAndUpdate(
        { email },
        { username, email, password, updateid: id },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "User information updated successfully" });
    }

    // Create new user instance
    const newUser = new Notification({
      username,
      email,
      password: password, // Remember to hash the password before storing it
      updateid: id,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get User List
const getUserList = async (req, res) => {
  try {
    const userList = await User.find({});
    res.status(200).json(userList);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ message: "Failed to fetch user list" });
  }
};

module.exports = { updateProfile, getUserList };
