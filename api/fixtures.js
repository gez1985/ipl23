const express = require('express');
const pool = require('../db');

const fixturesRouter = express.Router();

// Get all fixtures:

fixturesRouter.get('/', async(req, res) => {
  try {
    const allFixtures = await pool.query('SELECT * FROM fixtures');
    res.status(200).json(allFixtures.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a fixture:

fixturesRouter.post('/', async(req, res) => {
  try {
    const { homeTeamId, awayTeamId, date } = req.body;
    const sql = 'INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES ($1, $2, $3) RETURNING *';
    const values = [homeTeamId, awayTeamId, date];
    const newFixture = await pool.query(sql, values);
    res.status(201).json(newFixture.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a fixture: 

fixturesRouter.put('/', async(req, res) => {
  try {
    const { id, homeTeamId, awayTeamId, date } = req.body;
    const sql = 'UPDATE fixtures SET home_team_id = $1, away_team_id = $2, date = $3 WHERE id = $4 RETURNING *';
    const values = [homeTeamId, awayTeamId, date, id];
    const updateFixture = await pool.query(sql, values);
    res.status(200).json(updateFixture.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a fixture: 

fixturesRouter.delete('/:fixtureId', async(req, res) => {
  try {
    const id = req.params.fixtureId;
    const sql = "DELETE FROM fixtures WHERE id = $1";
    const values = [id];
    await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = fixturesRouter;