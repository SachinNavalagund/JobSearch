import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, //miliseconds
    httpOnly: true, // prevents XXS attack
    sameSite: "strict", //prevents CSRF attck
    secure: process.env.NODE_ENV === "production",
  });
};
