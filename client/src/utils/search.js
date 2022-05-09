import axios from "axios";
import camelCaseKeys from "camelcase-keys";

const Search = {};

Search.getAllPlayers = async () => {
  try {
    const response = await axios.get('/api/players');
    return response.data.map((player) => camelCaseKeys(player));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

Search.getAllScores = async () => {
  try {
    const response = await axios.get('/api/scores');
    return response.data.map((score) => camelCaseKeys(score));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

Search.getAllFixtures = async () => {
  try {
    const response = await axios.get('/api/fixtures');
    return response.data.map((fixture) => camelCaseKeys(fixture));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

Search.getAllTeams = async () => {
  try {
    const response = await axios.get('/api/teams');
    return response.data.map((team) => camelCaseKeys(team));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

Search.getAllManagers = async () => {
  try {
    const response = await axios.get('/api/managers');
    return response.data.map((manager) => camelCaseKeys(manager));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

Search.getAllLeagues = async () => {
  try {
    const response = await axios.get('/api/leagues');
    return response.data.map((league) => camelCaseKeys(league));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

// --- VIDIPRINTER --- //

// Get all vidiprinter:

Search.getAllVidiprinter = async () => {
  try {
    const response = await axios.get('/api/vidiprinter');
    return response.data.map((vidi) => camelCaseKeys(vidi));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

//  --- For Draft --- //

Search.getLeagueById = async (leagueId) => {
  try {
    const response = await axios.get(`/api/leagues/${leagueId}`);
    return response.data.map((league) => camelCaseKeys(league));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

Search.putManager = async (manager) => {
  console.log(`put manager reached`);
  console.log('manager', manager);
  try {
    const response = await axios.put('/api/managers', manager);
    console.log('response', response);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

Search.putLeague = async (league) => {
  try {
    const response = await axios.put('/api/leagues', league);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

Search.postVidiprinter = async (entry) => {
  try {
    const response = await axios.post('/api/vidiprinter', entry);
    return camelCaseKeys(response.data);
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve(null));
  }
};

Search.getVidiprinterById = async (leagueId) => {
  try {
    const response = await axios.get(`/api/vidiprinter/${leagueId}`);
    return response.data.map((vidiprinter) => camelCaseKeys(vidiprinter));
  } catch (err) {
    console.error(err.message);
    return new Promise((resolve) => resolve([]));
  }
};

export default Search;
