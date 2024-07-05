// routes/lobby.routes.js

import express from 'express';
import { createLobby } from '../controllers/lobbyController.js';
import { verifyJwtToken } from '../middleware/verify.js';

const router = express.Router();

router.post('/',verifyJwtToken, createLobby);

export default router;
