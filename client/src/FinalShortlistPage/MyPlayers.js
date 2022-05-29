import React, { useContext } from "react";
import { ManagerContext, LeagueContext, PlayersContext } from "../Store";
import MyPlayersButtons from "./MyPlayersButtons";
import Helpers from "../utils/Helpers";
import { IconContext } from "react-icons";
import { TiTimes, TiTick } from "react-icons/ti";

export default function MyPlayers() {
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [players] = useContext(PlayersContext);

  const myPlayerIds = manager.stage1Squad.filter((playerId) => {
    const player = Helpers.getObjectById(players, playerId);
    if (league.stage3Teams.includes(player.teamId)) {
      return true;
    } else {
      return null
    }
  });

  const renderPlayerEntry = (playerId, index) => {
    const player = Helpers.getObjectById(players, playerId);
    return (
      <div className="ss-my-players-list-entry" key={index}>
        {manager.stage3Squad.includes(playerId) ? (
          <IconContext.Provider value={{ color: "green", size: "2em" }}>
            <TiTick />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "red", size: "2em" }}>
            <TiTimes />
          </IconContext.Provider>
        )}
        <div className="ss-player-name">{player.name}</div>
        <MyPlayersButtons playerId={playerId} />
      </div>
    );
  };

  return (
    <div className="ss-my-players-container">
      <h1 className="ss-title">My Players</h1>
      <div className="ss-list-container">
        {myPlayerIds.map((playerId, index) =>
          renderPlayerEntry(playerId, index)
        )}
      </div>
    </div>
  );
}
