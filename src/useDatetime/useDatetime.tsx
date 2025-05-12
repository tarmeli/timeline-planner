import { getISOWeeksInYear, getWeek } from "date-fns";
import { parseISO, subDays, format } from "date-fns/fp";
import { flow } from "lodash/fp";

const useDatetime = () => {
  const currentDate = format("yyyy-MM-dd", new Date());
  const currentWeek = getWeek(currentDate, { weekStartsOn: 1 });

  const getPreviousDay = flow(parseISO, subDays(1), format("yyyy-MM-dd"));
  const getNextDay = flow(parseISO, subDays(-1), format("yyyy-MM-dd"));

  const numberOfWeeksInCurrentYear = getISOWeeksInYear(currentDate);

  return {
    currentDate,
    currentWeek,
    numberOfWeeksInCurrentYear,
    halfDaysInWeek: 14,
    getPreviousDay,
    getNextDay,
  };
};

export default useDatetime;
