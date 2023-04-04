const express = require('express');
const pool = require('../db');

const managersRouter = express.Router();

// Get all managers:

managersRouter.get('/', async(req, res) => {
  try {
    const allManagers = await pool.query('SELECT * FROM managers ORDER BY name');
    res.status(200).json(allManagers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a manager:

managersRouter.post('/', async(req, res) => {
  try {
    const { name, teamName, userId, adminLevel } = req.body;
    const sql = 'INSERT INTO managers (name, team_name, user_id, admin_level) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, teamName, userId, adminLevel];
    const newManager = await pool.query(sql, values);
    res.status(201).json(newManager.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a manager: 

managersRouter.put('/', async(req, res) => {
  try {
    const { id, name, teamName, userId, adminLevel, stage1Squad, stage2Squad, stage3Squad, autoPick, transfers, transferOutId, shortlist, stage2Shortlist, stage3Shortlist, minReqFirst } = req.body;
    const sql = 'UPDATE managers SET name = $1, team_name = $2, user_id = $3, admin_level = $4, stage_1_squad = $5, stage_2_squad = $6, stage_3_squad = $7, auto_pick = $8, transfers = $9, transfer_out_id = $10, shortlist = $11, stage_2_shortlist = $12, stage_3_shortlist = $13, min_req_first = $14 WHERE id = $15 RETURNING *';
    const values = [name, teamName, userId, adminLevel, stage1Squad, stage2Squad, stage3Squad, autoPick, transfers, transferOutId, shortlist, stage2Shortlist, stage3Shortlist, minReqFirst, id];
    const updateManager = await pool.query(sql, values);
    res.status(200).json(updateManager.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a manager: 

managersRouter.delete('/:managerId', async(req, res) => {
  try {
    const id = req.params.managerId;
    const sql = "DELETE FROM managers WHERE id = $1";
    const values = [id];
    const deleteManager = await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = managersRouter;