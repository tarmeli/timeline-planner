import { startOfWeek, addDays, setWeek, format } from "date-fns";

function getWeekDates(year: number, weekNumber: number): string[] {
  const firstDayOfYear = new Date(year, 0, 1);
  const firstWeek = setWeek(firstDayOfYear, weekNumber);

  const weekStart = startOfWeek(firstWeek, { weekStartsOn: 1 });

  return Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), "yyyy-MM-dd"),
  );
}

export default getWeekDates;
