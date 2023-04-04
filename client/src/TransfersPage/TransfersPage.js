import React, { useEffect, useContext } from "react";
import Players from "./Players";
import TransferList from "./TransferList";
import TransfersPageHeader from "./TransfersPageHeaders";
import PlayerSelect from "./PlayerSelect";
import {
  LeagueContext,
  ManagerContext,
  ManagersContext,
  PlayersContext,
  SearchNameContext,
} from "../Store";
import Helpers from "../utils/Helpers";
import Search from "../utils/search";

const sortObjectsArray = require("sort-objects-array");

const TransfersPage = () => {
  const [league] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [players] = useContext(PlayersContext);
  const [manager, setManager] = useContext(ManagerContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const myPlayers = [];
  manager.stage1Squad.forEach((playerId) =>
    myPlayers.push(Helpers.getObjectById(players, playerId))
  );

  const sortedMyPlayers = sortObjectsArray(myPlayers, "name", {
    caseinsensitive: true,
  });

  const defaultPlayer = Helpers.getObjectById(players, manager.transferOutId);

  const changePlayerOut = async (playerId) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.transferOutId = Number(playerId);
    try {
      await Search.putManager(managerCopy);
      setManager(managerCopy);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <TransfersPageHeader />
      <div className="standard-width-container">
        <div className="tp-main-container">
          <PlayerSelect
            options={sortedMyPlayers}
            defaultPlayer={defaultPlayer}
            changePlayerOut={changePlayerOut}
          />
          <div className="tp-conditional-content-wrapper">
            {!defaultPlayer && (
              <div className="tp-hidden-content-overlay">
                <h2 className="tp-select-player-overlay-caption">
                  Select a player for transfer
                </h2>
              </div>
            )}
            <Players />
            <TransferList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;
