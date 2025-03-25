import User from "../models/user.model.js";
import cloudinary from "../utils/Cloudinary.js"; // Cloudinary Config File

// Fetch user profile details
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile details (with Cloudinary image upload)
export const updateUserProfile = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    // If user uploads a new image, process it through Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles", // Save images under 'user_profiles' folder
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });

      updatedData.profileImage = result.secure_url; // Store Cloudinary URL
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin function to delete a user (Deletes Cloudinary image too)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete profile image from Cloudinary (if exists)
    if (user.profileImage) {
      const publicId = user.profileImage.split("/").pop().split(".")[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
