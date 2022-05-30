const express = require("express");
const pool = require("../db");

const leaguesRouter = express.Router();

// Get all leagues:

leaguesRouter.get("/", async (req, res) => {
  try {
    const allLeagues = await pool.query("SELECT * FROM leagues");
    res.status(200).json(allLeagues.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get league by id:

leaguesRouter.get("/:leagueId", async (req, res) => {
  try {
    const id = req.params.leagueId;
    const sql = "SELECT * FROM leagues WHERE id = $1";
    const values = [id];
    const league = await pool.query(sql, values);
    res.status(200).json(league.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a league:

leaguesRouter.post("/", async (req, res) => {
  try {
    const { name, adminManagerId, managerIds } = req.body;
    const sql =
      "INSERT INTO leagues (name, admin_manager_id, manager_ids) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, adminManagerId, managerIds];
    const newLeague = await pool.query(sql, values);
    res.status(201).json(newLeague.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a league:

leaguesRouter.put("/", async (req, res) => {
  try {
    const {
      name,
      adminManagerId,
      managerIds,
      draft1Live,
      round,
      pickNumber,
      up,
      lastPick,
      stage2Date,
      stage3Date,
      stage2Managers,
      stage2Teams,
      stage3Managers,
      stage3Teams,
      draftDate,
    } = req.body;
    const sql =
      "UPDATE leagues SET manager_ids = $1, draft_1_live = $2, round = $3, pick_number = $4, up = $5, last_pick = $6, stage_2_date = $7, stage_3_date = $8, stage_2_managers = $9, stage_2_teams = $10, stage_3_managers = $11, stage_3_teams = $12, admin_manager_id = $13, draft_date = $14 WHERE name = $15 RETURNING *";
    const values = [
      managerIds,
      draft1Live,
      round,
      pickNumber,
      up,
      lastPick,
      stage2Date,
      stage3Date,
      stage2Managers,
      stage2Teams,
      stage3Managers,
      stage3Teams,
      adminManagerId,
      draftDate,
      name,
    ];
    const updatedLeague = await pool.query(sql, values);
    res.status(200).json(updatedLeague.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a league:

leaguesRouter.delete("/:leagueName", async (req, res) => {
  try {
    const name = req.params.leagueName;
    const sql = "DELETE FROM leagues WHERE name = $1";
    const values = [name];
    const deleteFixture = await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = leaguesRouter;
