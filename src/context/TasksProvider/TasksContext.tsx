import { createContext } from "react";
import { Task } from "../../data/task";
import { noop } from "lodash/fp";

const TasksContext = createContext({
  tasks: [] as Task[],
  addTask: (task: Task) => noop(task),
  removeTask: (taskId: string) => noop(taskId),
  softRemoveTask: (taskId: string) => noop(taskId),
  setStartDate: (task: Task, startDate: string) => noop(task, startDate),
  setEndDate: (task: Task, endDate: string) => noop(task, endDate),
  changeTaskName: (taskId: string, newName: string) => noop(taskId, newName),
});

export default TasksContext;
