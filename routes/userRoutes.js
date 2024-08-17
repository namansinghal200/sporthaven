import express from "express";
import { Register, Login, getUser} from "../controllers/user.js";
import { verifyJwtToken } from "../middleware/verify.js";
import upload from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", upload.single("profile_pic"), Register);
router.post("/login", Login);
router.get("/:userId", getUser);


router.get('/getbyname/:username', async (req, res) => {
    console.log('Request Params:', req.params);
    const username = req.params.username;
    try {
      const user = await User.findOne({ where: { username } });
      console.log('User Found:', user);
      if (user) {
        res.json({ userId: user.id });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: error.message });
    }
  });

export default router;
