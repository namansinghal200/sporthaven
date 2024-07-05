// import jwt from "jsonwebtoken";

// export const verifyJwtToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.token.token;
//     if (!token) return res.status(401).json({ message: "Unauthorized" });
//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//       if (err) {
//         return res.status(401).json({ message: "Wrong credentials" });
//       }
//       //return res.json({ user });
//       req.user = user;
//     });
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

import jwt from "jsonwebtoken";

export const  verifyJwtToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming your token is directly in req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Attach user information to req.user
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};
