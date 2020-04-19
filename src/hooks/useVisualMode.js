/* returns an object with a visual mode */
/*key notes here: 
https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd

use setState: If you mutate the state directly, the component will not be re-rendered and the changes will not be reflected. This is because the state is compared shallowly. 
solution: You should always use setState for changing the value of the state.

in setState: if you use the value of current state to update to the next state (as done in line 15), React may or may not re-render. This is because, state and props are updated asynchronously. 
solution:You should use the other form of setState as done on line 27 and 31. In this form, you can pass a function to setState which receives currentState and currentProps as arguments. The return value of this function is merged in with the existing state to form the new state.
' setHistory(prev => ([...prev, mode])) '
*/
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
//mode: history[history.length-1]
