import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children, initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks || []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
