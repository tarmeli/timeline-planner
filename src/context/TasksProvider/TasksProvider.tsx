import { ReactNode, useEffect, useState } from "react";
import { Task } from "../../data/task";
import { filter, map } from "lodash/fp";
import TasksContext from "./TasksContext";

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks") || "[]";

    setTasks(JSON.parse(storedTasks));
  }, []);

  const setStartDate = (task: Task, startDate: string) => {
    const updatedTasks = map(
      (oldTask) =>
        oldTask.id === task.id ? { ...oldTask, startDate } : oldTask,
      tasks,
    );

    handleTasksChange(updatedTasks);
  };

  const setEndDate = (task: Task, endDate: string) => {
    const updatedTasks = map(
      (oldTask) => (oldTask.id === task.id ? { ...oldTask, endDate } : oldTask),
      tasks,
    );

    handleTasksChange(updatedTasks);
  };

  const handleTasksChange = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];

    handleTasksChange(updatedTasks);
  };

  const softRemoveTask = (taskId: string) => {
    const updatedTasks = map(
      (task) => (task.id === taskId ? { ...task, isDeleted: true } : task),
      tasks,
    );

    handleTasksChange(updatedTasks);
  };

  const removeTask = (taskId: string) => {
    const updatedTasks = filter((task) => task.id !== taskId, tasks);

    handleTasksChange(updatedTasks);
  };

  const changeTaskName = (taskId: string, newName: string) => {
    const updatedTasks = map(
      (task) => (task.id === taskId ? { ...task, title: newName } : task),
      tasks,
    );

    handleTasksChange(updatedTasks);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        softRemoveTask,
        setStartDate,
        setEndDate,
        changeTaskName,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
