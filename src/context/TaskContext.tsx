import React, { createContext, useReducer, ReactNode, Dispatch, useEffect } from "react";
import { TaskState, TaskAction, tasksReducer } from "../features/tasksReducer";

interface TaskContextType {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const storedTasks = typeof window !== "undefined"
    ? localStorage.getItem("tasks")
    : null;

  const initialState: TaskState = {
    tasks: storedTasks ? JSON.parse(storedTasks) : [],
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
