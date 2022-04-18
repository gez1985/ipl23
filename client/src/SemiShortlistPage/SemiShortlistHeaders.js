import ComponentNav from "../ComponentNav";
import MobileComponentNav from "../MobileComponentNav";
import SemiShortlistTitle from "./SemiShortlistTitle";

export default function SemiShortlistHeaders() {
  return (
    <>
      <ComponentNav />
      <MobileComponentNav />
      <div className="title-container">
        <SemiShortlistTitle title="My Semi Shortlist" />
      </div>
    </>
  );
}
