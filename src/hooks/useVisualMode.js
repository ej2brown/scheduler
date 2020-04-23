import { useState } from "react";

export default function useVisualMode(initial) {
    const [history, setHistory] = useState([initial]);

    /* use the hook to transition forward and back */
    function transition(mode, replace = false) {
        replace
            ? setHistory((prev) => [...prev.slice(0, prev.length - 1), mode])
            : setHistory((prev) => [...prev, mode]);
    }
    function back() {
        history.length > 1 &&
            setHistory((prev) => prev.slice(0, prev.length - 1));
    }
    return { mode: history[history.length - 1], transition, back };
}
