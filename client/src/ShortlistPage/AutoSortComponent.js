import React, { useState, useEffect, useContext } from "react";
import { ManagerContext, PlayersContext } from "../Store";
import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import AutoSortItemDisplay from "./AutoSortItemDisplay";

const AutoSortComponent = ({ playerId, close }) => {
  const [manager, setManager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(manager.shortlist.length - 1);
  const [compareIndex, setCompareIndex] = useState(
    Math.floor((startIndex + endIndex) / 2)
  );
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [tempManager, setTempManager] = useState();
  const [displayIndex, setDisplayIndex] = useState();

  useEffect(() => {
    setCompareIndex(Math.floor((startIndex + endIndex) / 2));
  });

  const sortPlayer = Helpers.getObjectById(players, playerId);
  const comparePlayer = Helpers.getObjectById(
    players,
    manager.shortlist[compareIndex]
  );

  const addSecondPlayer = async (listed) => {
    console.log("adding second player");
    const managerCopy = JSON.parse(JSON.stringify(manager));
    if (listed) {
      managerCopy.shortlist.splice(1, 0, playerId);
    } else {
      managerCopy.shortlist.splice(0, 0, playerId);
    }
    try {
      await Search.putManager(managerCopy);
      setManager(managerCopy);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const addPlayerToShortlist = async () => {
  //   const managerCopy = JSON.parse(JSON.stringify(manager));
  //   const entryIndex =
  //     endIndex === compareIndex ? compareIndex + 1 : compareIndex;
  //   console.log({ entryIndex });
  //   try {
  //     managerCopy.shortlist.splice(entryIndex, 0, playerId);
  //     await Search.putManager(managerCopy);
  //     setManager(managerCopy);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const chooseSorted = async () => {
  //   if (endIndex === compareIndex) {
  //     await addPlayerToShortlist();
  //     close();
  //   } else {
  //     setStartIndex(compareIndex + 1);
  //   }
  // };

  // const chooseUnsorted = async () => {
  //   if (startIndex === compareIndex) {
  //     await addPlayerToShortlist();
  //     close();
  //   } else {
  //     setEndIndex(compareIndex - 1);
  //   }
  // };

  // const choosePlayer = async (listed) => {
  //   if (startIndex === compareIndex && compareIndex === endIndex) {
  //     console.log("all indexes are equal");
  //     await addSecondPlayer(listed);
  //     close();
  //   } else if (startIndex === compareIndex || compareIndex === endIndex) {
  //     console.log("going to add player to shortlist");
  //     await addPlayerToShortlist();
  //     close();
  //   } else {
  //     if (listed) {
  //       setStartIndex(compareIndex + 1);
  //     } else {
  //       setEndIndex(compareIndex - 1);
  //     }
  //   }
  // };

  const chooseSorted = async () => {
    if (endIndex === compareIndex) {
      setSorted(true);
      setConfirm(true);
      const managerCopy = JSON.parse(JSON.stringify(manager));
      managerCopy.shortlist.splice(compareIndex + 1, 0, playerId);
      setTempManager(managerCopy);
      setDisplayIndex(compareIndex + 1);
      // await Search.putManager(managerCopy);
      // setManager(managerCopy);
      // close();
      // return;
    }
    setStartIndex(compareIndex + 1);
  };

  const chooseUnsorted = async () => {
    if (startIndex === compareIndex) {
      setSorted(false);
      setConfirm(true);
      const managerCopy = JSON.parse(JSON.stringify(manager));
      managerCopy.shortlist.splice(compareIndex, 0, playerId);
      setTempManager(managerCopy);
      setDisplayIndex(compareIndex);
      // await Search.putManager(managerCopy);
      // setManager(managerCopy);
      // close();
      // return;
    }
    setEndIndex(compareIndex - 1);
  };

  const ConfirmPlayerDisplay = ({ index }) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.shortlist.splice(displayIndex, 0, playerId);
    const player = Helpers.getObjectById(players, managerCopy.shortlist[index]);
    if (index > -1 && player) {
      return (
        <div>
          {index + 1} This is a player display for {player.name}
        </div>
      );
    }
    return null;
  };

  if (confirm) {
    return (
      <div>
        <ConfirmPlayerDisplay index={displayIndex - 2} />
        <ConfirmPlayerDisplay index={displayIndex - 1} />
        <ConfirmPlayerDisplay index={displayIndex} />
        <ConfirmPlayerDisplay index={displayIndex + 1} />
        <ConfirmPlayerDisplay index={displayIndex + 2} />
        <button>confirm</button>
        <button onClick={close}>cancel</button>
      </div>
    );
  }

  return (
    <div>
      <AutoSortItemDisplay
        player={sortPlayer}
        chooseClick={chooseUnsorted}
        listed={false}
      />
      <AutoSortItemDisplay
        player={comparePlayer}
        chooseClick={chooseSorted}
        listed={true}
      />
    </div>
  );
};

export default AutoSortComponent;
