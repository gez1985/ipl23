const express = require("express");
const pool = require("../db");

const vidiprinterRouter = express.Router();

// Get all entries:

vidiprinterRouter.get("/", async (req, res) => {
  try {
    const allEntries = await pool.query("SELECT * FROM vidiprinter");
    res.status(200).json(allEntries.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//  Get by league id:

vidiprinterRouter.get("/:leagueId", async (req, res) => {
  try {
    const id = req.params.leagueId;
    const sql = "SELECT * FROM vidiprinter WHERE league_id = $1";
    const values = [id];
    const vidiprinter = await pool.query(sql, values);
    res.status(200).json(vidiprinter.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post an entry:

vidiprinterRouter.post("/", async (req, res) => {
  try {
    const { leagueId, managerId, playerId } = req.body;
    const sql =
      "INSERT INTO vidiprinter (league_id, manager_id, player_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [leagueId, managerId, playerId];
    const newEntry = await pool.query(sql, values);
    res.status(201).json(newEntry.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update an entry not necessary:

// Delete a league entries:

vidiprinterRouter.delete("/:leagueId", async (req, res) => {
  try {
    const id = req.params.leagueId;
    const sql = "DELETE FROM vidiprinter WHERE league_id = $1";
    const values = [id];
    const deleteEntry = await pool.query(sql, values);
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = vidiprinterRouter;
