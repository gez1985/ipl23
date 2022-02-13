import React from "react";


export default function MatchScore(props) {

  const { homeManager, awayManager, stage } = props;


  function getHomePoints() {
    if (stage === 2) {
      return homeManager.stage2Points;
    } else if (stage === 3) {
      return homeManager.stage3Points;
    }
  }

  function getAwayPoints() {
    if (stage === 2) {
      return awayManager.stage2Points;
    } else if (stage === 3) {
      return awayManager.stage3Points;
    }
  }

  return (
    <div className="finals-container">
      <div className="finals-team-left">
        <div className="finals-team-name">{homeManager.teamName}</div>
        <div className="finals-manager-name">{homeManager.name}</div>
      </div>
      <div className="finals-score">
        {getHomePoints()} - {getAwayPoints()}
      </div>
      <div className="finals-team-right">
        <div className="finals-team-name">{awayManager.teamName}</div>
        <div className="finals-manager-name">{awayManager.name}</div>
      </div>
    </div>
  );
}
