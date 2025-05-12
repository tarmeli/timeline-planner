import { useContext, DragEvent } from "react";
import "./App.scss";

import Days from "./components/Days/Days";
import { Tasks } from "./components/Tasks/Tasks";
import { Weeks } from "./components/Weeks/Weeks";
import WeeksContext from "./context/WeeksProvider/WeeksContext";
import DragContext from "./context/DragProvider/DragContext";
import TasksContext from "./context/TasksProvider/TasksContext";

const App = () => {
  const { decrementWeeksToView, incrementWeeksToView, resetWeeksToView } =
    useContext(WeeksContext);

  const { isDraggingTask, draggedTaskId, setIsDraggingTask } =
    useContext(DragContext);
  const { softRemoveTask } = useContext(TasksContext);

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();

    softRemoveTask(draggedTaskId);
    setIsDraggingTask(false);
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="buttons-container">
        <button onClick={decrementWeeksToView}>{"<"}</button>

        <button
          className={`reset-button ${isDraggingTask && "delete-drop-on"}`}
          onClick={resetWeeksToView}
          onDrop={(event) => handleDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
        >
          {isDraggingTask ? "X" : "Back to current week"}
        </button>

        <button onClick={incrementWeeksToView}>{">"}</button>
      </div>

      <div className="weeks-container">
        <Weeks />
      </div>

      <div className="dates-container">
        <Days />
      </div>

      <div className="tasks-container">
        <Tasks />
      </div>
    </div>
  );
};

export default App;
