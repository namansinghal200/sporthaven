// controllers/sportController.js

import db from '../models/index.js';
const { Sport } = db;

// Controller function to create a new sport
export const createSport = async (req, res, next) => {
  try {
    const { name, maxsize } = req.body;

    // Create the sport
    const newSport = await Sport.create({
      name,
      maxsize
    });

    res.status(201).json(newSport);
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

export const getSportByName = async (req, res, next) => {
    try {
      const { name } = req.params;
      console.log(name);
  
      // Find the sport by name
      const sport = await Sport.findOne({
        where: { name }
      });
  
      if (!sport) {
        return res.status(404).json({ message: 'Sport not found' });
      }
  
      res.status(200).json(sport);
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  };

  export const getSportDetailsByName = async (req, res, next) => {
    try {
      const { name } = req.params;
  
      // Find the sport by name
      const sport = await Sport.findOne({
        where: { name }
      });
  
      if (!sport) {
        return res.status(404).json({ message: 'Sport not found' });
      }
  
      // Extract specific details you want to return
      const { maxsize, currentsize } = sport;
  
      res.status(200).json({ name, maxsize, currentsize });
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  };
