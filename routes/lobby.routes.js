// routes/lobby.routes.js

import express from 'express';
import { createLobby, enterLobby, getActiveLobbies, getPending, getUpdatedLobbies, updateWinners } from '../controllers/lobbyController.js';
import { verifyJwtToken } from '../middleware/verify.js';

const router = express.Router();

router.post('/',verifyJwtToken, createLobby);
router.put('/enter/:lobbyid', verifyJwtToken, enterLobby);
router.get('/getactive', verifyJwtToken, getActiveLobbies);
router.get('/getpending', verifyJwtToken, getPending);
router.put('/update/:lobbyid', verifyJwtToken, updateWinners);
router.get('/getupdated', verifyJwtToken, getUpdatedLobbies);


export default router;
