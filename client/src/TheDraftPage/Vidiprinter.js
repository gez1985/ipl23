import React, { useContext, useState } from "react";
import { VidiprinterContext, LeagueManagersContext as ManagersContext, PlayersContext } from "../Store";
import Helpers from "../utils/Helpers";
import leftArrow from "../img/LeftArrow.png";
import rightArrow from "../img/RightArrow.png";

export default function Vidiprinter() {
  const [vidiprinter] = useContext(VidiprinterContext);
  const [managers] = useContext(ManagersContext);
  const [players] = useContext(PlayersContext);
  const [count, setCount] = useState(0);

  function handleCountUpClick() {
    if (count < vidiprinter.length - 1) {
      const newCount = count + 1;
      setCount(newCount);
    }
  }

  function handleCountDownClick() {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
    }
  }

  function renderVidiprinterEntry(vidi) {
    return (
      <div className="vidiprinter-entry" key={vidi.id}>
        <div className="one-line vidi-heading">
          {Helpers.getNameById(managers, vidi.managerId)}:
        </div>
        <div className="one-line vidi-player">
          {Helpers.getNameById(players, vidi.playerId)}
        </div>
      </div>
    );
  }

  function renderVidiprinterEntrySmall() {
    if (!vidiprinter.length) {
      return;
    }
    const vidiEntry = vidiprinter[count];
    return (
      <>
        <img
          className="vidi-arrow"
          src={leftArrow}
          alt="previous"
          onClick={handleCountDownClick}
        />
        <div className="vidi-info-container">
          <div className="vidi-heading">
            {Helpers.getNameById(managers, vidiEntry.managerId)}:
          </div>
          <div className="vidi-player">
            {Helpers.getNameById(players, vidiEntry.playerId)}
          </div>
        </div>
        <img
          className="vidi-arrow"
          src={rightArrow}
          alt="previous"
          onClick={handleCountUpClick}
        />
      </>
    );
  }

  if (vidiprinter) {
    return (
      <>
        <div className="vidiprinter-big disappear-medium">
          {vidiprinter.map((vidi) => renderVidiprinterEntry(vidi))}
        </div>
        <div className="vidiprinter-small disappear-medium2">
          {renderVidiprinterEntrySmall()}
        </div>
      </>
    );
  }
  return null;
}
