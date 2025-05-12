import "./Task.scss";

import { Task } from "../../data/task";
import { useContext, useEffect, useState } from "react";
import TasksContext from "../../context/TasksProvider/TasksContext";
import { differenceInDays } from "date-fns";
import DatesContext from "../../context/DatesProvider/DatesContext";
import { includes, times } from "lodash/fp";
import useDatetime from "../../useDatetime/useDatetime";
import DragContext from "../../context/DragProvider/DragContext";

export interface TaskRowProps {
  task: Task;
}

const dragOverHandlerFor =
  (action: () => void) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    action();
  };

export const TaskRow = ({ task }: TaskRowProps) => {
  const [isAdjustingStartDate, setIsAdjustingStartDate] =
    useState<boolean>(false);
  const [isAdjustingEndDate, setIsAdjustingEndDate] = useState<boolean>(false);
  const [
    datesBetweenFirstDayToViewAndStartDate,
    setDatesBetweenFirstDayToViewAndStartDate,
  ] = useState<number>(0);
  const [
    datesBetweenLastDayToViewAndEndDate,
    setDatesBetweenLastDayToViewAndEndDate,
  ] = useState<number>(0);
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);

  const { setStartDate, setEndDate, changeTaskName } = useContext(TasksContext);
  const { datesToView } = useContext(DatesContext);
  const { setIsDraggingTask, setDraggedTaskId } = useContext(DragContext);
  const { getPreviousDay, getNextDay } = useDatetime();

  useEffect(() => {
    setDatesBetweenFirstDayToViewAndStartDate(
      differenceInDays(datesToView[0], task.startDate),
    );
    setDatesBetweenLastDayToViewAndEndDate(
      differenceInDays(datesToView[datesToView.length - 1], task.endDate),
    );
  }, [datesToView, task.endDate, task.startDate]);

  const startDateIsInView = includes(task.startDate, datesToView);
  const endDateIsInView = includes(task.endDate, datesToView);

  const taskIsInView = startDateIsInView || endDateIsInView;

  if (task.isDeleted || !taskIsInView) return null;

  const incrementStartDate = () =>
    setStartDate(task, getPreviousDay(task.startDate));

  const decrementStartDate = () =>
    setStartDate(task, getNextDay(task.startDate));

  const incrementEndDate = () => setEndDate(task, getNextDay(task.endDate));

  const decrementEndDate = () => setEndDate(task, getPreviousDay(task.endDate));

  const getColumnEnd = () => {
    if (!endDateIsInView) {
      return -1;
    }

    if (datesBetweenLastDayToViewAndEndDate === 0) {
      return -1;
    }

    return -datesBetweenLastDayToViewAndEndDate - 1;
  };

  const dragOverIncrementStartDateHandler =
    dragOverHandlerFor(incrementStartDate);
  const dragOverDecrementStartDateHandler =
    dragOverHandlerFor(decrementStartDate);

  const dragOverIncrementEndDateHandler = dragOverHandlerFor(incrementEndDate);
  const dragOverDecrementEndDateHandler = dragOverHandlerFor(decrementEndDate);

  const handleTaskDragStart = () => {
    setIsDraggingTask(true);
    setDraggedTaskId(task.id);
  };

  return (
    <>
      {times((i) => {
        return (
          <div
            key={i}
            onDragEnter={
              isAdjustingStartDate
                ? (event) => dragOverIncrementStartDateHandler(event)
                : undefined
            }
          />
        );
      }, Math.abs(datesBetweenFirstDayToViewAndStartDate))}

      <div
        className="task-row"
        style={{
          gridColumnStart: startDateIsInView
            ? Math.abs(datesBetweenFirstDayToViewAndStartDate) + 1
            : 1,
          gridColumnEnd: getColumnEnd(),
        }}
      >
        <div
          className="tasks-grid_cell"
          style={{
            borderRadius: !startDateIsInView
              ? "0 0.5rem 0.5rem 0"
              : !endDateIsInView
                ? "0.5rem 0 0 0.5rem"
                : "0.5rem",
          }}
        >
          {startDateIsInView && (
            <div
              className="drag-task-date"
              draggable="true"
              onDragStart={() => setIsAdjustingStartDate(true)}
              onDragEnd={() => setIsAdjustingStartDate(false)}
            />
          )}

          <div
            className="task"
            draggable="true"
            onDragStart={() => handleTaskDragStart()}
            onDragEnd={() => setIsDraggingTask(false)}
            onDragEnter={
              isAdjustingStartDate
                ? (event) => dragOverDecrementStartDateHandler(event)
                : isAdjustingEndDate
                  ? (event) => dragOverDecrementEndDateHandler(event)
                  : undefined
            }
          >
            {isEditingTaskName ? (
              <input
                onChange={(event) =>
                  changeTaskName(task.id, event.target.value)
                }
                onKeyDown={(event) =>
                  includes(event.key, ["Escape", "Enter"]) &&
                  setIsEditingTaskName(false)
                }
                ref={(input) => input?.focus()}
              />
            ) : (
              <span
                onClick={() => setIsEditingTaskName(true)}
                className="task-name"
              >
                {task.title}
              </span>
            )}
          </div>

          {endDateIsInView && (
            <div
              className="drag-task-date"
              draggable="true"
              onDragStart={() => setIsAdjustingEndDate(true)}
              onDragEnd={() => setIsAdjustingEndDate(false)}
            />
          )}
        </div>
      </div>

      {times((i) => {
        return (
          <div
            key={i}
            onDragEnter={
              isAdjustingEndDate
                ? (event) => dragOverIncrementEndDateHandler(event)
                : undefined
            }
          />
        );
      }, datesBetweenLastDayToViewAndEndDate)}
    </>
  );
};
