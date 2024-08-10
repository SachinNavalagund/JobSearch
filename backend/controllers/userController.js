import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    //Taking all fields from request body
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }

    const file = req.file;

    const fileUri = getDataUri(file);
    const response = await cloudinary.uploader.upload(fileUri.content);

    //checking user already exist,
    const user = await User.findOne({ email });
    // Yes -> show error
    if (user) {
      return res.status(400).json({
        message: `User already exist with this email : ${email}`,
      });
    }

    //No -> make him register
    //hashing password before saving to db with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: response.secure_url },
    });

    await newUser.save();

    const savedUser = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    };

    return res.status(201).json({
      message: "User has been registered successfully",
      savedUser,
    });
  } catch (error) {
    console.log(
      `Error in register function from userController : ${error.message}`
    );
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
      });
    }

    const userID = user._id;
    generateTokenAndSetCookie(userID, res);

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(201).json({
      message: `Welcome back ${user.fullName}`,
      userData,
    });
  } catch (error) {
    console.log(
      `Error in register function from userController : ${error.message}`
    );
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(
      `Error in logout function from userController : ${error.message}`
    );
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    console.log(fullName, email, phoneNumber, bio, skills);

    const file = req.file;

    const fileUri = getDataUri(file);

    const response = await cloudinary.uploader.upload(fileUri.content);

    let skillArray;
    if (skills) {
      skillArray = skills.split(",");
    }

    const userID = req.user._id;
    console.log(userID);

    let user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skillArray || user.profile.skills;
    if (response) {
      user.profile.resume = response.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    user = await user.save();

    return res
      .status(201)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
