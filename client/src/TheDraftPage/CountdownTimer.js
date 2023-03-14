import { useState, useEffect, useContext } from "react";
import { LeagueContext, ManagerContext } from "../Store";

export default function CountdownTimer({ skipPick, live, resetTimer }) {
  const [counter, setCounter] = useState(60);
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => setCounter(counter - 1), 1000);
    } else {
      skipPick();
      setTimeout(() => {
        if (live && league.pickNumber === manager.pickNumber) {
          setCounter(60);
        }
      }, 15000);
    }
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    console.log("reset timer has changed I need to reset the timer");
    setCounter(60);
  }, [resetTimer]);

  return (
    <>
      {counter > 0 && <div>{counter} seconds</div>}
      {counter === 0 && <div>Time up!</div>}
    </>
  );
}
