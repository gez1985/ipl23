const express = require("express");
const pool = require("../db");

const transfersRouter = express.Router();

// Get all entries:

transfersRouter.get("/", async (req, res) => {
  try {
    const allEntries = await pool.query("SELECT * FROM transfers");
    res.status(200).json(allEntries.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Post an entry:

transfersRouter.post("/", async (req, res) => {
  try {
    const { managerId, playerInId, playerOutId } = req.body;
    const sql =
      "INSERT INTO transfers (manager_id, player_in_id, player_out_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [managerId, playerInId, playerOutId];
    const newEntry = await pool.query(sql, values);
    res.status(201).json(newEntry.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update an entry not necessary:

// Delete a league entries:

// transfersRouter.delete("/:leagueId", async (req, res) => {
//   try {
//     const id = req.params.leagueId;
//     const sql = "DELETE FROM transfers WHERE league_id = $1";
//     const values = [id];
//     const deleteEntry = await pool.query(sql, values);
//     res.sendStatus(204);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

module.exports = transfersRouter;
