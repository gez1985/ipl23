import { IconContext } from "react-icons";
import { FaUtensilSpoon } from "react-icons/fa";
import { FaTrophy, FaAward } from "react-icons/fa";

export default function RenderChampions({ title, champions }) {
  const RenderEntry = ({ entryObject }) => {
    const { year, champion, runnerUp, woodenSpoon } = entryObject;
    return (
      <>
        <div className="competition-champs-entry-container">
          <div className="competition-champs-year">{year}</div>
          <div className="competition-entry-names-container">
            <div className="competition-champs-name-entry">
              <div className="competition-champs-icon-container">
                <FaTrophy />
              </div>
              <div className="competition-champs-name">{champion}</div>
            </div>
            <div className="competition-champs-name-entry">
              <div className="competition-champs-icon-container">
                <FaAward />
              </div>
              <div className="competition-champs-name">{runnerUp}</div>
            </div>
            <div className="competition-champs-name-entry">
              <div className="competition-champs-icon-container">
                <FaUtensilSpoon />
              </div>
              <div className="competition-champs-name">{woodenSpoon}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="competition-champs-container">
        <div className="competition-champs-title">{title}</div>
        {champions.map((entryObject) => (
          <RenderEntry entryObject={entryObject} />
        ))}
      </div>
    </>
  );
}
