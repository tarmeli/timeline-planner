import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WeeksProvider from "./context/WeeksProvider/WeeksProvider.tsx";
import DatesProvider from "./context/DatesProvider/DatesProvider.tsx";
import DragProvider from "./context/DragProvider/DragProvider.tsx";
import TasksProvider from "./context/TasksProvider/TasksProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeeksProvider>
      <DatesProvider>
        <DragProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </DragProvider>
      </DatesProvider>
    </WeeksProvider>
  </StrictMode>,
);
