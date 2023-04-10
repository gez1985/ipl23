const Helpers = require("./helpers");

const getScorePoints = (player, score) => {
  const playingPoints = getPlayingPoints(score);
  const battingPoints = getBattingPoints(player, score);
  const bowlingPoints = getBowlingPoints(score);
  const fieldingPoints = getFieldingPoints(score);
  const totalPoints =
    playingPoints + battingPoints + bowlingPoints + fieldingPoints;
  return totalPoints;
};

const getPlayingPoints = () => {
  return 4;
};

const getBattingPoints = (player, score) => {
  const strikeRate = Number(((score.runs / score.balls) * 100).toFixed(2));
  const runsPoints = score.runs;
  const foursPoints = score.fours;
  const sixesPoints = score.sixes * 2;
  const strikeRatePoints = getStrikeRatePoints(score.balls, strikeRate);
  const totalBonusPoints = getTotalBonusBattingPoints(score.runs, strikeRate);
  const isDuck = getDuckPoints(player.role, score.runs, score.balls, score.out);
  const totalBattingPoints =
    runsPoints +
    foursPoints +
    sixesPoints +
    strikeRatePoints +
    totalBonusPoints +
    isDuck;
  return totalBattingPoints;
};

const getDuckPoints = (role, runs, balls, out) => {
  if (role === "BW") {
    return 0;
  }
  if (!out) {
    return 0;
  }
  if (runs !== 0) {
    return 0;
  }
  if (runs === 0 && out) {
    if (balls === 1) {
      return -10;
    } else {
      return -5;
    }
  }
};

const getStrikeRatePoints = (balls, strikeRate) => {
  if (balls > 9) {
    if (strikeRate < 50) {
      return -6;
    } else if (strikeRate >= 50 && strikeRate < 60) {
      return -4;
    } else if (strikeRate >= 60 && strikeRate < 80) {
      return -2;
    } else if (strikeRate >= 80 && strikeRate < 120) {
      return 0;
    } else if (strikeRate >= 120 && strikeRate < 140) {
      return 2;
    } else if (strikeRate >= 140 && strikeRate < 170) {
      return 4;
    } else if (strikeRate >= 170 && strikeRate < 200) {
      return 6;
    } else if (strikeRate >= 200) {
      return 8;
    }
  } else {
    return 0;
  }
};

const getTotalBonusBattingPoints = (runs, strikeRate) => {
  if (strikeRate >= 100) {
    if (runs >= 30 && runs < 50) {
      return 4;
    } else if (runs >= 50 && runs < 75) {
      return 6;
    } else if (runs >= 75 && runs < 100) {
      return 10;
    } else if (runs >= 100) {
      return 15;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const getBowlingPoints = (score) => {
  const economy = Number((score.runsConceded / score.overs).toFixed(2));
  const oversPoints = score.overs * 2;
  const wicketsPoints = score.wickets * 20;
  const maidensPoints = score.maidens * 15;
  const totalWicketsBonus = getTotalWicketsBonus(score.wickets);
  const economyBonus = getEconomyBonus(economy, score.overs);
  const totalBowlingPoints =
    oversPoints +
    wicketsPoints +
    maidensPoints +
    totalWicketsBonus +
    economyBonus;
  return totalBowlingPoints;
};

const getTotalWicketsBonus = (wickets) => {
  if (wickets < 3) {
    return 0;
  } else if (wickets === 3) {
    return 10;
  } else if (wickets === 4) {
    return 15;
  } else if (wickets >= 5) {
    return 20;
  }
};

const getEconomyBonus = (economy, overs) => {
  if (isNaN(economy)) {
    economy = 0;
  }
  if (economy < 4) {
    return overs * 10;
  } else if (economy >= 4 && economy < 4.5) {
    return overs * 8;
  } else if (economy >= 4.5 && economy < 5) {
    return overs * 6;
  } else if (economy >= 5 && economy < 6) {
    return overs * 4;
  } else if (economy >= 6 && economy < 7) {
    return overs * 2;
  } else if (economy >= 7 && economy < 9) {
    return overs * 0;
  } else if (economy >= 9 && economy < 10) {
    return overs * -1;
  } else if (economy >= 10 && economy < 11) {
    return overs * -2;
  } else if (economy >= 11 && economy < 12) {
    return overs * -3;
  } else if (economy >= 12) {
    return overs * -4;
  }
};

const getFieldingPoints = (score) => {
  const catchesPoints = score.catches * 10;
  const runOutPartPoints = score.partRunOuts * 6;
  const runOutFullPoints = score.fullRunOuts * 12;
  const stumpingsPoints = score.stumpings * 12;
  const fieldingPoints =
    catchesPoints + runOutPartPoints + runOutFullPoints + stumpingsPoints;
  return fieldingPoints;
};

const getStagePoints = (players, scores, fixtures, league) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const stage2Fixtures = fixtures.filter(
    (fixture) =>
      fixture.date >= league.stage2Date && fixture.date < league.stage3Date
  );
  const stage3Fixtures = fixtures.filter(
    (fixture) => fixture.date >= league.stage3Date
  );
  const stage2FixtureIds = stage2Fixtures.map((fixture) => fixture.id);
  const stage3FixtureIds = stage3Fixtures.map((fixture) => fixture.id);
  const stage2Scores = scores.filter((score) =>
    stage2FixtureIds.includes(score.fixtureId)
  );
  const stage3Scores = scores.filter((score) =>
    stage3FixtureIds.includes(score.fixtureId)
  );
  players.forEach((player) => {
    const playerStage2Scores = stage2Scores.filter(
      (score) => score.playerId === player.id
    );
    const playerStage3Scores = stage3Scores.filter(
      (score) => score.playerId === player.id
    );
    const stage2TotalPointsArray = playerStage2Scores.map((score) =>
      getScorePoints(player, score)
    );
    const stage2TotalPoints = stage2TotalPointsArray.reduce(reducer, 0);
    player.stage2Points = stage2TotalPoints;
    const stage3TotalPointsArray = playerStage3Scores.map((score) =>
      getScorePoints(player, score)
    );
    const stage3TotalPoints = stage3TotalPointsArray.reduce(reducer, 0);
    player.stage3Points = stage3TotalPoints;
  });
};

module.exports.getPlayerScores = (players, scores, teams) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  players.forEach((player) => {
    const playerScores = scores.filter((score) => score.playerId === player.id);
    const playerTotalPointsArray = playerScores.map((score) =>
      getScorePoints(player, score)
    );
    const playerTotalPoints = playerTotalPointsArray.reduce(reducer, 0);
    player.totalPoints = playerTotalPoints;
    const playerTotalRunsArray = playerScores.map((score) => score.runs);
    const playerTotalRuns = playerTotalRunsArray.reduce(reducer, 0);
    player.runs = playerTotalRuns;
    const playerTotalFoursArray = playerScores.map((score) => score.fours);
    const playerTotalFours = playerTotalFoursArray.reduce(reducer, 0);
    player.fours = playerTotalFours;
    const playerTotalSixesArray = playerScores.map((score) => score.sixes);
    const playerTotalSixes = playerTotalSixesArray.reduce(reducer, 0);
    player.sixes = playerTotalSixes;
    const playerTotalCatchesArray = playerScores.map((score) => score.catches);
    const playerTotalCatches = playerTotalCatchesArray.reduce(reducer, 0);
    player.catches = playerTotalCatches;
    const playerTotalOversArray = playerScores.map((score) => score.overs);
    const playerTotalOvers = playerTotalOversArray.reduce(reducer, 0);
    player.overs = playerTotalOvers;
    const playerTotalRunsConcededArray = playerScores.map(
      (score) => score.runsConceded
    );
    const playerTotalRunsConceded = playerTotalRunsConcededArray.reduce(
      reducer,
      0
    );
    player.runsConceded = playerTotalRunsConceded;
    const playerTotalWicketsArray = playerScores.map((score) => score.wickets);
    const playerTotalWickets = playerTotalWicketsArray.reduce(reducer, 0);
    player.wickets = playerTotalWickets;
    const playerTotalMaidensArray = playerScores.map((score) => score.maidens);
    const playerTotalMaidens = playerTotalMaidensArray.reduce(reducer, 0);
    player.maidens = playerTotalMaidens;
    const playerTotalDotBallsArray = playerScores.map(
      (score) => score.dotBalls
    );
    const playerTotalDotBalls = playerTotalDotBallsArray.reduce(reducer, 0);
    player.dotBalls = playerTotalDotBalls;
    const playerTotalStumpingsArray = playerScores.map(
      (score) => score.stumpings
    );
    const playerTotalStumpings = playerTotalStumpingsArray.reduce(reducer, 0);
    player.stumpings = playerTotalStumpings;
    const playerTotalPartRunOutsArray = playerScores.filter(
      (score) => score.partRunOuts
    );
    const playerTotalPartRunOuts = playerTotalPartRunOutsArray.reduce(
      reducer,
      0
    );
    player.partRunOuts = playerTotalPartRunOuts;
    const playerTotalFullRunOutsArray = playerScores.filter(
      (score) => score.fullRunOuts
    );
    const playerTotalFullRunOuts = playerTotalFullRunOutsArray.reduce(
      reducer,
      0
    );
    player.fullRunOuts = playerTotalFullRunOuts;
    player.appearances = playerScores.length;
    player.team = Helpers.getNameById(teams, player.teamId);
    player.manager = "Not Selected";
  });
};
