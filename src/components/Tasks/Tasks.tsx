import "./Tasks.scss";

import { useContext } from "react";
import TasksContext from "../../context/TasksProvider/TasksContext";
import { map } from "lodash/fp";
import { TaskRow } from "../TaskRow/TaskRow";
import { format } from "date-fns";
import useDatetime from "../../useDatetime/useDatetime";

export const Tasks = () => {
  const { tasks, addTask } = useContext(TasksContext);
  const { getPreviousDay, getNextDay } = useDatetime();

  const handleAddTask = () => {
    addTask({
      id: (tasks.length + 1).toString(),
      title: `Task ${tasks.length + 1}`,
      isDeleted: false,
      startDate: getPreviousDay(format(new Date(), "yyyy-MM-dd")),
      endDate: getNextDay(format(new Date(), "yyyy-MM-dd")),
    });
  };

  return (
    <>
      <div className="tasks-grid">
        {map(
          (task) => (
            <TaskRow task={task} key={task.id} />
          ),
          tasks,
        )}
      </div>

      <div className="add-task-buttons">
        <button className="add-task-button" onClick={() => handleAddTask()}>
          Add task
        </button>
      </div>
    </>
  );
};
