const pool = require("../db");
const camelCaseKeys = require("camelcase-keys");
const Scores = require("./scores");
const ManagerProps = require("./manager-props");

const buildData = async () => {
  try {
    const managersResponse = await pool.query("SELECT * FROM managers");
    const playersResponse = await pool.query("SELECT * FROM players");
    const scoresResponse = await pool.query("SELECT * FROM scores");
    const fixturesResponse = await pool.query("SELECT * FROM fixtures");
    const teamsResponse = await pool.query("SELECT * FROM teams");
    const managers = managersResponse.rows.map((manager) =>
      camelCaseKeys(manager)
    );
    const players = playersResponse.rows.map((player) => camelCaseKeys(player));
    const scores = scoresResponse.rows.map((score) => camelCaseKeys(score));
    const fixtures = fixturesResponse.rows.map((fixture) =>
      camelCaseKeys(fixture)
    );
    const teams = teamsResponse.rows.map((team) => camelCaseKeys(team));
    Scores.getPlayerScores(players, scores, teams);
    ManagerProps.getManagerProperties(managers, players);
    return { managers, players };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = buildData;
