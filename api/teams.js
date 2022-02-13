const express = require('express');
const pool = require('../db');

const teamsRouter = express.Router();

// Get all teams:

teamsRouter.get('/', async(req, res) => {
  try {
    const allTeams = await pool.query('SELECT * FROM teams');
    res.status(200).json(allTeams.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a team:

teamsRouter.post('/', async(req, res) => {
  try {
    const { name } = req.body;
    const sql = 'INSERT INTO teams (name) VALUES ($1) RETURNING *';
    const values = [name];
    const newTeam = await pool.query(sql, values);
    res.status(201).json(newTeam.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a team: 

teamsRouter.put('/', async(req, res) => {
  try {
    const { name, id } = req.body;
    const sql = 'UPDATE teams SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];
    const updateTeam = await pool.query(sql, values);
    res.status(200).json(updateTeam.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a team: 

teamsRouter.delete('/:teamId', async(req, res) => {
  try {
    const id = req.params.teamId;
    const sql = "DELETE FROM teams WHERE id = $1";
    const values = [id];
    await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = teamsRouter;