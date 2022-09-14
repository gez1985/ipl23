import React, { useContext, useState } from "react";
import { SearchNameContext } from "../Store";
import { ManagerContext } from "../Store";
import Loader from "react-loader-spinner";
import Search from "../utils/search";

export default function ShortlistTitle(props) {
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useContext(ManagerContext);
  const [searchName, setSearchName] = useContext(SearchNameContext);

  const handleMinReqChange = async () => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.minReqFirst = !managerCopy.minReqFirst;
    setLoading(true);
    await Search.putManager(managerCopy);
    setManager(managerCopy);
    setLoading(false);
  };

  return (
    <div className="players-header">
      <div className="flex-container space-between">
        <div className="players-title-container-end disappear-small">
          <input
            type="text"
            placeholder="Search by name:"
            className="player-search"
            onChange={(e) => setSearchName(e.target.value)}
            defaultValue={searchName}
          ></input>
        </div>
        <div className="players-title-container-middle disappear-small">
          <div className="page-title">{props.title}</div>
        </div>
        <div className="players-title-container-end align-items-end disappear-small">
          {!loading && (
            <>
              <input
                type="checkbox"
                checked={manager.minReqFirst}
                onChange={handleMinReqChange}
              />
              <label className="shortlist-checkbox-label">Min req first?</label>
            </>
          )}
          {loading && (
            <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />
          )}
        </div>
      </div>
      <div className="flex-container space-between">
        <div className="disappear-big">
          <div
            className="page-title players-title"
            style={{ textAlign: "left", marginLeft: "5px" }}
          >
            {props.title}
          </div>
        </div>
        <div className="disappear-big " style={{ marginRight: "5px" }}>
          <input
            type="text"
            placeholder="Search by name:"
            className="player-search"
            onChange={(e) => setSearchName(e.target.value)}
            defaultValue={searchName}
          ></input>
        </div>
      </div>
    </div>
  );
}
