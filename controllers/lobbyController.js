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


// import db from '../models/index.js';
// const { Lobby, LobbyUserIds } = db;

// export const createLobby = async (req, res, next) => {
//   try {
//     const { sportid, maxsize } = req.body;
//     const userId = req.user.id; // Assuming user ID is available in req.user

//     // Create the lobby
//     const newLobby = await Lobby.create({
//       sportid,
//       maxsize,
//       currentsize: 1, // Initial size of 1 since the creating user is joining
//       isactive: true
//     });

//     // Log the created lobby
//     console.log('New Lobby:', newLobby);

//     // Add the current user to the lobby_userids table
//     const lobbyUser = await LobbyUserIds.create({
//       lobbyid: newLobby.lobbyid,
//       userid: userId
//     });

//     // Log the added lobby user
//     console.log('Lobby User:', lobbyUser);

//     res.status(201).json(newLobby);
//   } catch (error) {
//     console.error('Error creating lobby:', error);
//     next(error); // Pass any errors to the error handling middleware
//   }
// };




// controllers/lobbyController.js

import db from '../models/index.js';
const { Lobby, LobbyUserIds, Sport, User } = db;

export const createLobby = async (req, res, next) => {
  try {
    const { sportid, maxsize } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

     // Check if the user is already in a lobby
     const user = await User.findByPk(userId);
     if (user && user.activelobby) {
       return res.status(400).json({ message: 'User is already in a lobby' });
     }

    // Find the sport by sportid to check available spots
    const sport = await Sport.findByPk(sportid);

    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    // Check if there are available spots in the sport
    if (sport.currentsize >= sport.maxsize) {
      return res.status(400).json({ message: 'No available spots in the selected sport' });
    }

    // Check if maxsize of the lobby exceeds available spots in the sport
    if (maxsize > sport.maxsize - sport.currentsize) {
      return res.status(400).json({ message: 'Lobby size exceeds available spots in the selected sport' });
    }

    // Create the lobby
    const newLobby = await Lobby.create({
      sportid,
      maxsize,
      currentsize: 1, // Initial size of 1 since the creating user is joining
      isactive: true
    });

    // Increment the currentsize of the sport by the currentsize of the lobby
    sport.currentsize += newLobby.currentsize;
    await sport.save(); // Save the updated sport
    // Check if the current size of the newly created lobby equals maxsize
    if (newLobby.currentsize === newLobby.maxsize) {
      newLobby.isactive = false;
      await newLobby.save(); // Save the updated lobby with isactive set to false
    } else {
      newLobby.isactive = true; // Set isactive to true if current size is less than maxsize
      await newLobby.save();
    }

    // Log the created lobby
    console.log('New Lobby:', newLobby);

    // Add the current user to the lobby_userids table
    const lobbyUser = await LobbyUserIds.create({
      lobbyid: newLobby.lobbyid,
      userid: userId
    });
    // Update the user's activelobby and currentlobby fields
    const user3 = await User.findByPk(userId);
    if (user3) {
      user3.activelobby = true;
      user3.currentlobby = lobbyid;
      await user3.save(); // Save the updated user
    }
    // Log the added lobby user
    console.log('Lobby User:', lobbyUser);

    res.status(201).json(newLobby);
  } catch (error) {
    console.error('Error creating lobby:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};



export const enterLobby = async (req, res, next) => {
  try {
    const { lobbyid } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user

     // Check if the user is already in a lobby
     const user2 = await User.findByPk(userId);
     if (user2 && user2.activelobby) {
       return res.status(400).json({ message: 'User is already in a lobby' });
     }

    // Find the lobby by lobbyid
    const lobby = await Lobby.findByPk(lobbyid);

    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }

    // Check if the lobby is active
    if (!lobby.isactive) {
      return res.status(400).json({ message: 'Lobby is not active' });
    }

    // Increment the current size of the lobby
    lobby.currentsize += 1;

    // Check if current size equals max size to deactivate the lobby
    if (lobby.currentsize === lobby.maxsize) {
      lobby.isactive = false;
    }

    // Save the updated lobby
    await lobby.save();

    // Add the user to the lobby_userids table
    const lobbyUser = await LobbyUserIds.create({
      lobbyid: lobby.lobbyid,
      userid: userId
    });

    // Log the added lobby user
    console.log('Entered Lobby User:', lobbyUser);

    const sport = await Sport.findByPk(lobby.sportid);
    if (sport) {
      sport.currentsize += 1;
      await sport.save(); // Save the updated sport
    }

     // Update the user's activelobby and currentlobby fields
     const user = await User.findByPk(userId);
     if (user) {
       user.activelobby = true;
       user.currentlobby = lobbyid;
       await user.save(); // Save the updated user
     }

    res.status(200).json(lobby);
  } catch (error) {
    console.error('Error entering lobby:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};


export const getActiveLobbies = async (req, res, next) => {
  try {
    // Query active lobbies where isactive is true
    const activeLobbies = await Lobby.findAll({
      where: {
        isactive: true
      }
    });

    res.status(200).json(activeLobbies);
  } catch (error) {
    console.error('Error fetching active lobbies:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};


export const getPending = async (req, res, next) => {
  try {
    // Query lobbies where isactive is false and isupdated is false
    const inactiveLobbies = await Lobby.findAll({
      where: {
        isactive: false,
        isupdated: false
      }
    });

    res.status(200).json(inactiveLobbies);
  } catch (error) {
    console.error('Error fetching inactive and not updated lobbies:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};


export const updateWinners = async (req, res, next) => {
  try {
    const { lobbyid } = req.params;
    const { winner, score } = req.body;

    // Find the lobby by lobbyid
    const lobby = await Lobby.findByPk(lobbyid);

    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }

    // Check if the lobby is inactive
    if (lobby.isactive) {
      return res.status(400).json({ message: 'Lobby is still active' });
    }

    // Check if the lobby has already been updated
    if (lobby.isupdated) {
      return res.status(400).json({ message: 'Lobby has already been updated' });
    }

    // Update the winner and score values
    lobby.winner = winner;
    lobby.score = score;
    lobby.isupdated = true;

    // Save the updated lobby
    await lobby.save();

    res.status(200).json(lobby);
  } catch (error) {
    console.error('Error updating lobby winner and score:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};


export const getUpdatedLobbies = async (req, res, next) => {
  try {
    // Find all lobbies where isupdated is true
    const updatedLobbies = await Lobby.findAll({
      where: {
        isupdated: true
      }
    });

    res.status(200).json(updatedLobbies);
  } catch (error) {
    console.error('Error fetching updated lobbies:', error);
    next(error); // Pass any errors to the error handling middleware
  }
};
