import "./Week.scss";

import useDatetime from "../../useDatetime/useDatetime";

const Week = ({ weekNumber }: { weekNumber: number }) => {
  const { currentWeek } = useDatetime();

  return (
    <div className={`week ${weekNumber === currentWeek ? "current-week" : ""}`}>
      Week {weekNumber}
    </div>
  );
};

export default Week;
