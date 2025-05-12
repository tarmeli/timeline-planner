import { map } from "lodash/fp";
import { useContext } from "react";
import WeeksContext from "../../context/WeeksProvider/WeeksContext";
import Week from "../Week/Week";

export const Weeks = () => {
  const { weeksToView } = useContext(WeeksContext);

  return <>{
    map(
      (weekNumber: number) => <Week weekNumber={weekNumber} key={weekNumber} />,
      weeksToView
    )}</>;
};
