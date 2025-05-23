import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { fullname }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already registered"
            : "Username already taken",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    const userId = req.user.userId;

    // Check if email is being changed and if it's already taken
    if (email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    // Check if fullname is being changed and if it's already taken
    if (fullname) {
      const fullnameExists = await User.findOne({
        fullname,
        _id: { $ne: userId },
      });

      if (fullnameExists) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(fullname && { fullname }),
        ...(email && { email }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: {
          id: updatedUser._id,
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          updatedAt: updatedUser.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // Get user with password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check current password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while changing password",
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;

    // Validate password
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your password to confirm deletion",
      });
    }

    // Get user with password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting account",
    });
  }
};

// @desc    Check if email exists
// @route   POST /api/users/check-email
// @access  Public
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    res.status(200).json({
      success: true,
      exists: !!user,
    });
  } catch (error) {
    console.error("Check email error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking email",
    });
  }
};

// @desc    Check if username exists
// @route   POST /api/users/check-username
// @access  Public
export const checkUsername = async (req, res) => {
  try {
    const { fullname } = req.body;

    if (!fullname) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const user = await User.findOne({ fullname });

    res.status(200).json({
      success: true,
      exists: !!user,
    });
  } catch (error) {
    console.error("Check username error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking username",
    });
  }
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req, res) => {
  // Since JWT is stateless, actual logout happens on client by removing token
  // This endpoint can be used for any server-side cleanup if needed

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
