import { map } from "lodash/fp";
import { useContext } from "react";
import DatesContext from "../../context/DatesProvider/DatesContext";
import Day from "../Day/Day";

const Days = () => {
  const { datesToView } = useContext(DatesContext);

  return map((date) => <Day date={date} key={date} />, datesToView);
};

export default Days;
