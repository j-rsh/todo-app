export interface Task {
    id: string;
    title: string;
    category: string;
    completed: boolean;
    description?: string;
    dueDate?: string;
    createdAt?: string;
  }
  
  export type TaskState = {
    tasks: Task[];
  };
  
  export type TaskAction =
    | { type: "ADD_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "TOGGLE_TASK"; payload: string }
    | { type: "EDIT_TASK"; payload: Task };
  
  export const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
      case "ADD_TASK":
        return { tasks: [...state.tasks, action.payload] };
  
      case "DELETE_TASK":
        return { tasks: state.tasks.filter((t) => t.id !== action.payload) };
  
      case "TOGGLE_TASK":
        return {
          tasks: state.tasks.map((t) =>
            t.id === action.payload ? { ...t, completed: !t.completed } : t
          ),
        };
  
      case "EDIT_TASK":
        return {
          tasks: state.tasks.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
        };
  
      default:
        return state;
    }
  };
  