import RenderChampions from "./RenderChampions";

export default function Champions() {
  const iplChampions = [
    { year: 2021, champion: "Matthew Joss", runnerUp: "Gerard Egan", woodenSpoon: "Tom Kent" },
    { year: 2022, champion: "?", runnerUp: "?", woodenSpoon: "Tom Kent" },
  ];
  const wcChampions = [
    { year: 2021, champion: "Can Ogan", runnerUp: "Kimberley Kings", woodenSpoon: "Tom Kent" },
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
