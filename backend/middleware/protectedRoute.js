import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({
        message: "You are not loggedin, please login",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return response.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }

    const user = await User.findById(decode.userID).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Somthing went wrong in middleware : ${error.message}`);
  }
};
