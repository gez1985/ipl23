const express = require('express');
const pool = require('../db');

const playersRouter = express.Router();

// Get all players:

playersRouter.get('/', async(req, res) => {
  try {
    const allPlayers = await pool.query('SELECT * FROM players');
    res.status(200).json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a player:

playersRouter.post('/', async(req, res) => {
  try {
    const { name, teamId, role } = req.body;
    const sql = 'INSERT INTO players (name, team_id, role) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, teamId, role];
    const newPlayer = await pool.query(sql, values);
    res.status(201).json(newPlayer.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a player: 

playersRouter.put('/', async(req, res) => {
  try {
    const { id, name, teamId, role } = req.body;
    const sql = 'UPDATE players SET name = $1, team_id = $2, role = $3 WHERE id = $4 RETURNING *';
    const values = [name, teamId, role, id];
    const updatePlayer = await pool.query(sql, values);
    res.status(200).json(updatePlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a player: 

playersRouter.delete('/:playerId', async(req, res) => {
  try {
    const id = req.params.playerId;
    const sql = "DELETE FROM players WHERE id = $1";
    const values = [id];
    await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = playersRouter;