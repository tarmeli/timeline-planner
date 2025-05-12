import { ReactNode, useContext, useEffect, useState } from "react";
import useDatetime from "../../useDatetime/useDatetime";
import DatesContext from "./DatesContext";
import getWeekDates from "./getWeekdates/getWeekDates";
import { getYear } from "date-fns/fp";
import { flatMap } from "lodash/fp";
import WeeksContext from "../WeeksProvider/WeeksContext";

const DatesProvider = ({ children }: { children: ReactNode }) => {
  const { weeksToView } = useContext(WeeksContext);
  const { currentDate } = useDatetime();

  const currentYear = getYear(currentDate);

  const [datesToView, setDatesToView] = useState<string[]>(
    flatMap((week) => getWeekDates(currentYear, week), weeksToView),
  );

  useEffect(() => {
    setDatesToView(
      flatMap((week) => getWeekDates(currentYear, week), weeksToView),
    );
  }, [weeksToView, currentYear]);

  return (
    <DatesContext.Provider
      value={{
        datesToView,
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};

export default DatesProvider;
