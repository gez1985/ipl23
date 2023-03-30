import RenderChampions from "./RenderChampions";

export default function Champions() {
  const iplChampions = [
    {
      year: 2023,
      champion: "?",
      runnerUp: "?",
      woodenSpoon: "?",
    },
    {
      year: 2022,
      champion: "Phil Rogers",
      runnerUp: "Manj More",
      woodenSpoon: "Oliver Gill",
    },
    {
      year: 2021,
      champion: "Matthew Joss",
      runnerUp: "Gerard Egan",
      woodenSpoon: "Tom Kent",
    },
  ];
  const wcChampions = [
    {
      year: 2022,
      champion: "Phil Rogers",
      runnerUp: "Jonny Mottram",
      woodenSpoon: "Jonathan Palmer",
    },
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
