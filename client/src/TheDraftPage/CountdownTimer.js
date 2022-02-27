import { useState, useEffect } from "react";

export default function CountdownTimer({ skipPick }) {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => setCounter(counter - 1), 1000);
    } else {
      skipPick();
    }

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>
      {counter > 0 && <div>{counter} seconds</div>}
      {counter === 0 && <div>Time up!</div>}
    </>
  );
}
