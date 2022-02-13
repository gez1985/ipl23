import React, { useState } from "react";

export const LeaguesContext = React.createContext();
export const LeagueContext = React.createContext();
export const ManagersContext = React.createContext();
export const ManagerContext = React.createContext();
export const PlayersContext = React.createContext();
export const TeamsContext = React.createContext();
export const ScoresContext = React.createContext();
export const FixturesContext = React.createContext();
export const VidiprinterContext = React.createContext();
export const LoadingContext = React.createContext();
export const SortContext = React.createContext();
export const IncludeContext = React.createContext();
export const SearchNameContext = React.createContext();

const Store = ({ children }) => {
  const [leagues, setLeagues] = useState();
  const [league, setLeague] = useState();
  const [managers, setManagers] = useState();
  const [manager, setManager] = useState();
  const [players, setPlayers] = useState();
  const [teams, setTeams] = useState();
  const [scores, setScores] = useState();
  const [fixtures, setFixtures] = useState();
  const [vidiprinter, setVidiprinter] = useState();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [sort, setSort] = useState("name");
  const [include, setInclude] = useState("allPlayers");
  const [searchName, setSearchName] = useState("");

  return (
    <LeaguesContext.Provider value={[leagues, setLeagues]}>
      <LoadingContext.Provider value={[isLoadingData, setIsLoadingData]}>
        <LeagueContext.Provider value={[league, setLeague]}>
          <ManagersContext.Provider value={[managers, setManagers]}>
            <ManagerContext.Provider value={[manager, setManager]}>
              <PlayersContext.Provider value={[players, setPlayers]}>
                <TeamsContext.Provider value={[teams, setTeams]}>
                  <ScoresContext.Provider value={[scores, setScores]}>
                    <FixturesContext.Provider value={[fixtures, setFixtures]}>
                      <VidiprinterContext.Provider value={[vidiprinter, setVidiprinter]}>
                        <SortContext.Provider value={[sort, setSort]}>
                          <IncludeContext.Provider value={[include, setInclude]}>
                            <SearchNameContext.Provider value={[searchName, setSearchName]}>
                              {children}
                            </SearchNameContext.Provider>
                          </IncludeContext.Provider>
                        </SortContext.Provider>
                      </VidiprinterContext.Provider>
                    </FixturesContext.Provider>
                  </ScoresContext.Provider>
                </TeamsContext.Provider>
              </PlayersContext.Provider>
            </ManagerContext.Provider>
          </ManagersContext.Provider>
        </LeagueContext.Provider>
      </LoadingContext.Provider>
    </LeaguesContext.Provider>
  );
};

export default Store;
