import React, { createContext, useReducer, ReactNode, Dispatch, useEffect } from "react";
import { TaskState, TaskAction, tasksReducer } from "../features/tasksReducer";

interface TaskContextType {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // get tasks from localstorage or use empty array
  const storedTasks = typeof window !== "undefined"
    ? localStorage.getItem("tasks")
    : null;

  const initialState: TaskState = {
    tasks: storedTasks ? JSON.parse(storedTasks) : [],
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // save tasks to localstorage when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // provide state and dispatch to children
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
