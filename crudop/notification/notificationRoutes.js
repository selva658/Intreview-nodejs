const Notification = require("../../schema/admin/notification.schema");
const User = require("../../schema/users/user.schema");
const {
  sendApprovalEmailToUser,
  sendUnApprovalEmailToUser,
} = require("../../mail/emailservice");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getNotificationList = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notification list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateApproved = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's profile with the new information
      await User.findOneAndUpdate(
        { email },
        { username, email, password: hashedPassword },
        { new: true }
      );

      // Send approval email to the user
      await sendApprovalEmailToUser(email);

      // Delete the notification for the user
      await Notification.deleteOne({ email });

      // Fetch updated notifications
      const notifications = await Notification.find({});

      // Send the updated list of notifications as response
      res.json(notifications);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectUpdate = async (req, res) => {
  const { email } = req.body;

  try {
    // Delete the notification from the database
    const deletionResult = await Notification.deleteOne({ email });
    console.log("Deletion result:", deletionResult);

    // Fetch updated list of notifications
    const updatedNotifications = await Notification.find({});

    // Send unapproval email to the user
    await sendUnApprovalEmailToUser(email);

    // Return the updated list of notifications
    res.json(updatedNotifications);
  } catch (error) {
    console.error("Error rejecting update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getNotificationList, updateApproved, rejectUpdate };
