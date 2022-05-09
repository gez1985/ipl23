import React, { useContext } from "react";
import { ManagerContext, LeagueContext, PlayersContext } from "../Store";
import MyPlayersButtons from './MyPlayersButtons';
import Helpers from "../utils/Helpers";
import { IconContext } from "react-icons";
import { TiTimes, TiTick } from "react-icons/ti";

export default function MyPlayers() {
  const [manager, setManager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [players] = useContext(PlayersContext);

  const myPlayerIds = manager.stage1Squad.filter((playerId) => {
    const player = Helpers.getObjectById(players, playerId);
    if (league.stage2Teams.includes(player.teamId)) {
      return true;
    }
  });

  console.log('manager', manager);

  const renderPlayerEntry = (playerId, index) => {
    const player = Helpers.getObjectById(players, playerId);
    return (
      <div className="ss-my-players-list-entry" key={index}>
        {manager.stage2Shortlist.includes(playerId) ? (
          <IconContext.Provider value={{ color: "green", size: "2em" }}>
            <TiTick />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "red", size: "2em" }}>
            <TiTimes />
          </IconContext.Provider>
        )}
        <div className="ss-my-players-player-name">{player.name}</div>
          <MyPlayersButtons playerId={playerId}/>
      </div>
    );
  };

  return (
    <>
      <div className="ss-my-players-container">
        <h1 className="ss-my-players-title">My Players</h1>
        <div className="ss-my-players-list-container">
          {myPlayerIds.map((playerId, index) =>
            renderPlayerEntry(playerId, index)
          )}
        </div>
      </div>
    </>
  );
}
