import ComponentNav from "../ComponentNav";
import MobileComponentNav from "../MobileComponentNav";
import TransfersTitle from "./TransfersTitle";

export default function TransfersPageHeader() {
  return (
    <>
      <ComponentNav />
      <MobileComponentNav />
      <div className="title-container">
        <TransfersTitle title="Transfers" />
      </div>
    </>
  );
}
