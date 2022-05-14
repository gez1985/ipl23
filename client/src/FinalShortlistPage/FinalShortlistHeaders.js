import ComponentNav from "../ComponentNav";
import MobileComponentNav from "../MobileComponentNav";
import FinalShortlistTitle from "./FinalShortlistTitle";

export default function FinalShortlistHeaders() {
  return (
    <>
      <ComponentNav />
      <MobileComponentNav />
      <div className="title-container">
        <FinalShortlistTitle title="My Final Shortlist" />
      </div>
    </>
  );
}
