import express from "express";
import { Register, Login, getUser } from "../controllers/user.js";
import { verifyJwtToken } from "../middleware/verify.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("profile_pic"), Register);
router.post("/login", Login);
router.get("/:userId", getUser);

export default router;
