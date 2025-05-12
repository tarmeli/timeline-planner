import { noop } from "lodash/fp";
import { createContext } from "react";

const DragContext = createContext({
  isDraggingTask: false,
  setIsDraggingTask: (isDraggingTask: boolean) => noop(isDraggingTask),
  draggedTaskId: "",
  setDraggedTaskId: (draggedTaskId: string) => noop(draggedTaskId),
});

export default DragContext;
