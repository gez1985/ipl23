const express = require("express");
const pool = require("../db");

const draftRouter = express.Router();

// Make a pick: 

draftRouter.get("/pick", async (req, res) => {
  try {
    console.log('check pick route reached');
    res.json({ msg: "draft route ok" });
  } catch (error) {
    console.error(error.message);
  }
});

draftRouter.put("/pick", async (req, res) => {
  try {
    console.log("pick player reached");
    console.log(req.body);
    res.json({ msg: "player pick reached" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = draftRouter;
