import { ReactNode, useState } from "react";
import DragContext from "./DragContext";

const DragProvider = ({ children }: { children: ReactNode }) => {
  const [isDraggingTask, setIsDraggingTask] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string>("");

  return (
    <DragContext.Provider
      value={{
        isDraggingTask,
        setIsDraggingTask,
        draggedTaskId,
        setDraggedTaskId,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;
