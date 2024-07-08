// models/index.js

import Sequelize from 'sequelize';
import sequelize from '../config/db.config.js'; // Adjust the path as needed

import User from './User.js';
import Lobby from './Lobby.js';
import LobbyUserIds from './Lobby_userids.js';
import Sport from './Sport.js';

// Define associations
User.hasMany(LobbyUserIds, { foreignKey: 'user_id' });
Lobby.hasMany(LobbyUserIds, { foreignKey: 'lobbyid' });
LobbyUserIds.belongsTo(User, { foreignKey: 'user_id' });
LobbyUserIds.belongsTo(Lobby, { foreignKey: 'lobbyid' });
Lobby.belongsTo(Sport, { foreignKey: 'sportid' });

const db = {
  User,
  Lobby,
  LobbyUserIds,
    Sport,
  sequelize,
  Sequelize
};

export default db;
