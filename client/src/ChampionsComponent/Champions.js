import RenderChampions from "./RenderChampions";

export default function Champions() {
  const iplChampions = [
    { year: 2022, champion: "?", runnerUp: "?", woodenSpoon: "?" },
    {
      year: 2021,
      champion: "Matthew Joss",
      runnerUp: "Gerard Egan",
      woodenSpoon: "Tom Kent",
    },
  ];
  const wcChampions = [
    {
      year: 2021,
      champion: "Can Ogan",
      runnerUp: "Kimberley Kings",
      woodenSpoon: "Matthew Joss",
    },
  ];
  return (
    <div className="landing-champions-container">
      <RenderChampions
        title="IPL Champions"
        key="iplChamps"
        champions={iplChampions}
      />
      <RenderChampions
        title="World Cup Champions"
        key="wcChamps"
        champions={wcChampions}
      />
    </div>
  );
}
