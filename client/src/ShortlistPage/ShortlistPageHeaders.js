import ComponentNav from "../ComponentNav";
import MobileComponentNav from "../MobileComponentNav";
// import PlayersHeaders from "./PlayersHeaders";
import ShortlistTitle from "./ShortlistTitle";

export default function ShortlistPageHeader() {
  return (
    <>
      <ComponentNav />
      <MobileComponentNav />
      <div className="title-container">
        <ShortlistTitle title="Draft Shortlist" />
      </div>
    </>
  );
}
