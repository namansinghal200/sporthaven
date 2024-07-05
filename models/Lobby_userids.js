// models/LobbyUserIds.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js'; // Adjust the path as needed

const LobbyUserIds = sequelize.define('LobbyUserIds', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lobbyid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Lobby', // Reference to the Lobby model
      key: 'lobbyid',
    },
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // Reference to the User model
      key: 'userid',
    },
  },
}, {
  tableName: 'lobby_userids', // Name of the table in the database
  timestamps: false, // Disable createdAt and updatedAt columns
});

export default LobbyUserIds; 
