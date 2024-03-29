import ComponentNav from "../ComponentNav";
import MobileComponentNav from "../MobileComponentNav";
import DraftTitle from "./DraftTitle";
import DraftTableHeaders from "./DraftTableHeaders";

export default function DraftPageHeader({
  skipPick,
  live,
  showShortlistModal,
  showAutoPickModal,
  resetTimer,
}) {
  return (
    <>
      <ComponentNav />
      <MobileComponentNav />
      <div className="title-container">
        <DraftTitle
          title="The Draft"
          skipPick={skipPick}
          live={live}
          showShortlistModal={showShortlistModal}
          showAutoPickModal={showAutoPickModal}
          resetTimer={resetTimer}
        />
      </div>
      <DraftTableHeaders />
    </>
  );
}
