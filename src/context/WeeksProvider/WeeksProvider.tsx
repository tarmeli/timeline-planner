import { map } from "lodash/fp";
import { ReactNode, useCallback, useState } from "react";
import useDatetime from "../../useDatetime/useDatetime";
import WeeksContext from "./WeeksContext";

const WeeksProvider = ({ children }: { children: ReactNode }) => {
  const { currentWeek } = useDatetime();

  const [weeksToView, setWeeksToView] = useState<number[]>([
    currentWeek - 1,
    currentWeek,
    currentWeek + 1,
  ]);

  const incrementWeeksToView = useCallback(
    () => setWeeksToView(map((week: number) => week + 1, weeksToView)),
    [weeksToView],
  );
  const decrementWeeksToView = useCallback(
    () => setWeeksToView(map((week: number) => week - 1, weeksToView)),
    [weeksToView],
  );
  const resetWeeksToView = useCallback(
    () => setWeeksToView([currentWeek - 1, currentWeek, currentWeek + 1]),
    [currentWeek],
  );

  return (
    <WeeksContext.Provider
      value={{
        weeksToView,
        incrementWeeksToView,
        decrementWeeksToView,
        resetWeeksToView,
      }}
    >
      {children}
    </WeeksContext.Provider>
  );
};

export default WeeksProvider;
