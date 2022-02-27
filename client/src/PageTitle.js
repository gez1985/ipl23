import React from "react";
import DraftTitle from "./TheDraftPage/DraftTitle";
import PlayersTitle from "./PlayersTitle";

export default function PageTitle(props) {

  return (
    <>
      <div className="title-container">
        {props.from === "players" && <PlayersTitle title={props.title}/>}
        {props.from === "draft" && <DraftTitle title={props.title} />}
        {(props.from !== "players" && props.from !== "draft") && (
          <div className="page-title">{props.title}</div>
        )}
      </div>
    </>
  );
}
