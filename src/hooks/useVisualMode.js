/* returns an object with a visual mode */
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /* use the hook to transition forward and back */
  function transition(mode, replace = false) {
    if (!replace) setHistory([...history, mode]);
    setMode(mode);
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      const prevMode = history[history.length - 1];
      setMode(prevMode);
    }
  }

  return { mode, transition, back };
}
