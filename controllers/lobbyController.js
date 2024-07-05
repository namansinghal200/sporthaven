// // controllers/lobbyController.js

// import db from '../models/index.js';
// const { Lobby, LobbyUserIds } = db;

// // Controller function to create a new lobby
// export const createLobby = async (req, res, next) => {
//   try {
//     const { sportid, maxsize } = req.body;
//     // console.log(req);
//     const userId = req.user.id;  // Assuming user ID is available in req.user
//     console.log(userId);
//     // Create the lobby
//     const newLobby = await Lobby.create({
//       sportid,
//       maxsize,
//     });

//     // Add the current user to the lobby_userids table
//     await LobbyUserIds.create({
//       lobbyid: newLobby.lobbyid,
//       user_id: userId,
//     });

//     res.status(201).json(newLobby);
//   } catch (error) {
//     next(error); // Pass any errors to the error handling middleware
//   }
// };


import db from '../models/index.js';
const { Lobby, LobbyUserIds } = db;

export const createLobby = async (req, res, next) => {
  try {
    const { sportid, maxsize } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    // Create the lobby
    const newLobby = await Lobby.create({
      sportid,
      maxsize,
      currentsize: 1, // Initial size of 1 since the creating user is joining
      isactive: true
    });

    // Log the created lobby
    console.log('New Lobby:', newLobby);

    // Add the current user to the lobby_userids table
    const lobbyUser = await LobbyUserIds.create({
      lobbyid: newLobby.lobbyid,
      userid: userId
    });

    // Log the added lobby user
    console.log('Lobby User:', lobbyUser);

    res.status(201).json(newLobby);
  } catch (error) {
    console.error('Error creating lobby:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};
