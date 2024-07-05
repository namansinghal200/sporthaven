// routes/lobby.routes.js

import express from 'express';
import { createLobby, enterLobby } from '../controllers/lobbyController.js';
import { verifyJwtToken } from '../middleware/verify.js';

const router = express.Router();

router.post('/',verifyJwtToken, createLobby);
router.put('/enter/:lobbyid', verifyJwtToken, enterLobby);

export default router;
