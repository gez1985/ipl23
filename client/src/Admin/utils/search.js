import axios from "axios";
import camelCaseKeys from "camelcase-keys";

const Search = {};
const baseUrl = "/api";

// --- PLAYERS --- //

// Get all players:

Search.getAllPlayers = async () => {
  try {
    const url = `${baseUrl}/players`;
    const response = await axios.get(url);
    return response.data.map((player) => camelCaseKeys(player));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

// Post Player

Search.postPlayer = async (player) => {
  try {
    const url = `${baseUrl}/players`;
    const response = await axios.post(url, player);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Update player:

Search.putPlayer = async (player) => {
  try {
    const url = `${baseUrl}/players`;
    const response = await axios.put(url, player);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Delete a Player

Search.deletePlayer = async (playerId) => {
  const url = `${baseUrl}/players/${playerId}`;
  try {
    await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

// --- SCORES --- //

// Get all scores:

Search.getAllScores = async () => {
  try {
    const url = `${baseUrl}/scores`;
    const response = await axios.get(url);
    return response.data.map((score) => camelCaseKeys(score));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

// Post a score:

Search.postScore = async (score) => {
  try {
    const url = `${baseUrl}/scores`;
    const response = await axios.post(url, score);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Put a score:

Search.putScore = async (score) => {
  try {
    const url = `${baseUrl}/scores`;
    const response = await axios.put(url, score);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Delete a score:

Search.deleteScore = async (scoreId) => {
  const url = `${baseUrl}/scores/${scoreId}`;
  try {
    await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

// --- FIXTURES --- //

// Get all fixtures:

Search.getAllFixtures = async () => {
  try {
    const url = `${baseUrl}/fixtures`;
    const response = await axios.get(url);
    return response.data.map((fixture) => camelCaseKeys(fixture));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

//  Post a fixture:

Search.postFixture = async (fixture) => {
  try {
    const url = `${baseUrl}/fixtures`;
    const response = await axios.post(url, fixture);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Put a fixture:

Search.putFixture = async (fixture) => {
  try {
    const url = `${baseUrl}/fixtures`;
    const response = await axios.put(url, fixture);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Delete a fixture:

Search.deleteFixture = async (fixtureId) => {
  const url = `${baseUrl}/fixtures/${fixtureId}`;
  try {
    const response = await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

// --- TEAMS --- //

// Get all teams:

Search.getAllTeams = async () => {
  try {
    const url = `${baseUrl}/teams`;
    const response = await axios.get(url);
    return response.data.map((team) => camelCaseKeys(team));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

// Post team:

Search.postTeam = async (team) => {
  try {
    const url = `${baseUrl}/teams`;
    const response = await axios.post(url, team);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Update team:

Search.putTeam = async (team) => {
  try {
    const url = `${baseUrl}/teams`;
    const response = await axios.put(url, team);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Delete Team:

Search.deleteTeam = async (teamId) => {
  const url = `${baseUrl}/teams/${teamId}`;
  try {
    const response = await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

// --- MANAGERS --- //

// Get all managers

Search.getAllManagers = async () => {
  try {
    const url = `${baseUrl}/managers`;
    const response = await axios.get(url);
    return response.data.map((manager) => camelCaseKeys(manager));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

//  Post manager:

Search.postManager = async (manager) => {
  try {
    const url = `${baseUrl}/managers`;
    const response = await axios.post(url, manager);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

//  Put manager:

Search.putManager = async (manager) => {
  try {
    const url = `${baseUrl}/managers`;
    const response = await axios.put(url, manager);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

//  Delete manager:

Search.deleteManager = async (managerId) => {
  const url = `${baseUrl}/managers/${managerId}`;
  try {
    const response = await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

// --- LEAGUES --- //

// Get all leagues:

Search.getAllLeagues = async () => {
  try {
    const url = `${baseUrl}/leagues`;
    const response = await axios.get(url);
    return response.data.map((league) => camelCaseKeys(league));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

// Post a league:

Search.postLeague = async (league) => {
  try {
    const url = `${baseUrl}/leagues`;
    const response = await axios.post(url, league);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Update a league:

Search.putLeague = async (league) => {
  try {
    const url = `${baseUrl}/leagues`;
    const response = await axios.put(url, league);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

// Delete a league:

Search.deleteLeague = async (leagueId) => {
  const url = `${baseUrl}/leagues/${leagueId}`;
  try {
    const response = await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

// --- VIDIPRINTER --- //

// Get all vidiprinter:

Search.getAllVidiprinter = async () => {
  try {
    const url = `${baseUrl}/vidiprinter`;
    const response = await axios.get(url);
    return response.data.map((league) => camelCaseKeys(league));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

// Delete all from league:

Search.deleteVidiprinter = async (leagueId) => {
  try {
    const url = `${baseUrl}/vidiprinter/${leagueId}`;
    const response = await axios.delete(url);
  } catch (err) {
    console.error(err.message);
  }
};

export default Search;
