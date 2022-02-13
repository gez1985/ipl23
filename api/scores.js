const express = require('express');
const pool = require('../db');

const scoresRouter = express.Router();

// Get all scores:

scoresRouter.get('/', async(req, res) => {
  try {
    const allScores = await pool.query('SELECT * FROM scores');
    res.status(200).json(allScores.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a score:

scoresRouter.post('/', async(req, res) => {
  try {
    const { fixtureId, playerId, runs, balls, fours, sixes, catches, partRunOuts, fullRunOuts, stumpings, overs, runsConceded, wickets, maidens, dotBalls, out } = req.body;
    const sql = 'INSERT INTO scores (fixture_id, player_id, runs, balls, fours, sixes, catches, part_run_outs, full_run_outs, stumpings, overs, runs_conceded, wickets, maidens, dot_balls, out) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *';
    const values = [fixtureId, playerId, runs, balls, fours, sixes, catches, partRunOuts, fullRunOuts, stumpings, overs, runsConceded, wickets, maidens, dotBalls, out];
    const newScore = await pool.query(sql, values);
    res.status(201).json(newScore.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a score: 

scoresRouter.put('/', async(req, res) => {
  try {
    const { fixtureId, playerId, runs, balls, fours, sixes, catches, partRunOuts, fullRunOuts, stumpings, overs, runsConceded, wickets, maidens, dotBalls, out } = req.body;
    const sql = 'UPDATE scores SET  runs = $1, balls = $2, fours = $3, sixes = $4, catches = $5, part_run_outs = $6, full_run_outs = $7, stumpings = $8, overs = $9, runs_conceded = $10, wickets = $11, maidens = $12, dot_balls = $13, out = $14 WHERE fixture_id = $15 AND player_id = $16 RETURNING *';
    const values = [runs, balls, fours, sixes, catches, partRunOuts, fullRunOuts, stumpings, overs, runsConceded, wickets, maidens, dotBalls, out, fixtureId, playerId];
    const updateScore = await pool.query(sql, values);
    res.status(200).json(updateScore.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a score: 

scoresRouter.delete('/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM scores WHERE id = $1";
    const values = [id];
    await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = scoresRouter;