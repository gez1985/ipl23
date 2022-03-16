const express = require("express");
const pool = require("../db");

const draftRouter = express.Router();

// Make a pick:

draftRouter.put("/pick", async (req, res) => {
  try {
    const { playerId, manager, league } = req.body;
    console.log(playerId, manager, league);

    //  update manager database with managerCopy stage squad:

    if (league.draft1Live) {
      const sql =
        "UPDATE managers SET stage_1_squad = $1 WHERE id = $2 RETURNING *";
      const values = [manager.stage1Squad, manager.id];
      await pool.query(sql, values);
    } else if (league.draft2Live) {
      const sql =
        "UPDATE managers SET stage_3_squad = $1 WHERE id = $2 RETURNING *";
      const values = [manager.stage2Squad, manager.id];
      await pool.query(sql, values);
    } else if (league.draft3Live) {
      const sql =
        "UPDATE managers SET stage_3_squad = $1 WHERE id = $2 RETURNING *";
      const values = [manager.stage3Squad, manager.id];
      await pool.query(sql, values);
    }

    //  update vidiprinter with details:

    await vidiEntry(league.id, manager.id, playerId);

    //  

    res.json({ msg: "player pick reached" });
  } catch (error) {
    console.error(error.message);
  }
});

async function vidiEntry(leagueId, managerId, playerId) {
  const vidiSql =
    "INSERT INTO vidiprinter (league_id, manager_id, player_id) VALUES ($1, $2, $3) RETURNING *";
  const values = [leagueId, managerId, playerId];
  await pool.query(vidiSql, values);
}

module.exports = draftRouter;
