import ComponentNav from "../ComponentNav";
import MobileComponentNav from "../MobileComponentNav";
import PlayersHeaders from "./PlayersHeaders";
import PlayersTitle from "./PlayersTitle";

export default function DraftPageHeader() {
  return (
    <>
      <ComponentNav />
      <MobileComponentNav />
      <div className="title-container">
        <PlayersTitle title="Players" />
      </div>
      <PlayersHeaders />
    </>
  );
}
