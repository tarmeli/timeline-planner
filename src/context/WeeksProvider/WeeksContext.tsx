import { createContext } from "react";

const WeeksContext = createContext({
  weeksToView: [0, 0, 0],
  incrementWeeksToView: () => {},
  decrementWeeksToView: () => {},
  resetWeeksToView: () => {},
});

export default WeeksContext;
