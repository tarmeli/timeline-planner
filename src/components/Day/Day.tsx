import useDatetime from "../../useDatetime/useDatetime";
import "./Day.scss";

import { format, parseISO } from "date-fns";

const Day = ({ date }: { date: string }) => {
  const weekDay = format(parseISO(date), "EEE");

  const { currentDate } = useDatetime();

  return (
    <div className={`day ${date === currentDate && "current-day"}`} key={date}>
      {weekDay}
    </div>
  );
};

export default Day;
