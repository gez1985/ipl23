const Scores = {};

Scores.getScorePoints = (player, score) => {
  const playingPoints = Scores.getPlayingPoints(score);
  const battingPoints = Scores.getBattingPoints(player, score);
  const bowlingPoints = Scores.getBowlingPoints(score);
  const fieldingPoints = Scores.getFieldingPoints(score);
  const totalPoints =
    playingPoints + battingPoints + bowlingPoints + fieldingPoints;
  console.log(
    playingPoints,
    battingPoints,
    bowlingPoints,
    fieldingPoints,
    totalPoints
  );
  return totalPoints;
};

Scores.getPlayingPoints = () => {
  return 4;
};

Scores.getBattingPoints = (player, score) => {
  const strikeRate = Number(((score.runs / score.balls) * 100).toFixed(2));
  const runsPoints = score.runs;
  const foursPoints = score.fours;
  const sixesPoints = score.sixes * 2;
  const strikeRatePoints = Scores.getStrikeRatePoints(score.balls, strikeRate);
  const totalBonusPoints = Scores.getTotalBonusBattingPoints(
    score.runs,
    strikeRate
  );
  const isDuck = Scores.isDuck(player.role, score.runs, score.balls, score.out);
  const totalBattingPoints =
    runsPoints +
    foursPoints +
    sixesPoints +
    strikeRatePoints +
    totalBonusPoints +
    isDuck;
  return totalBattingPoints;
};

Scores.getStrikeRatePoints = (balls, strikeRate) => {
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

Scores.getTotalBonusBattingPoints = (runs, strikeRate) => {
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

Scores.isDuck = (role, runs, balls, out) => {
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

Scores.getBowlingPoints = (score) => {
  const economy = Number((score.runsConceded / score.overs).toFixed(2));
  const oversPoints = score.overs * 2;
  const wicketsPoints = score.wickets * 20;
  const maidensPoints = score.maidens * 15;
  const totalWicketsBonus = Scores.getTotalWicketsBonus(score.wickets);
  const economyBonus = Scores.getEconomyBonus(economy, score.overs);
  const totalBowlingPoints =
    oversPoints + wicketsPoints + maidensPoints + totalWicketsBonus + economyBonus;
  return totalBowlingPoints;
};

Scores.getTotalWicketsBonus = (wickets) => {
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

Scores.getEconomyBonus = (economy, overs) => {
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

Scores.getFieldingPoints = (score) => {
  console.log(score);
  const catchesPoints = score.catches * 10;
  const runOutPartPoints = score.partRunOuts * 6;
  const runOutFullPoints = score.fullRunOuts * 12;
  const stumpingsPoints = score.stumpings * 12;
  const fieldingPoints =
    catchesPoints + runOutPartPoints + runOutFullPoints + stumpingsPoints;
  return fieldingPoints;
};

export default Scores;
