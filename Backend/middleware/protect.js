import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ExpressError("Not authenticated. Please log in.", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ExpressError("User no longer exists.", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(new ExpressError("Invalid token. Please log in again.", 401));
    }
    if (err.name === "TokenExpiredError") {
      return next(new ExpressError("Token expired. Please log in again.", 401));
    }
    next(err);
  }
};

export default protect;
