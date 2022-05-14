import React, { useContext, useState } from "react";
import { ManagerContext } from "../Store";
import Search from "../utils/search";
import Loader from "react-loader-spinner";

export default function RemovePlayerButton({ index }) {
  const [manager, setManager] = useContext(ManagerContext);
  const [loading, setLoading] = useState(false);

  const handleRemoveClick = async (index) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.stage2Shortlist.splice(index, 1);
    setLoading(true);
    await Search.putManager(managerCopy);
    setManager(managerCopy);
    setLoading(false);
  };

  if (loading) {
    return <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />;
  }

  return (
    <button
      className="ss-button ss-button-discard"
      onClick={() => handleRemoveClick(index)}
    >
      Remove
    </button>
  );
}
