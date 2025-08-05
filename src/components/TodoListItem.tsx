import React from "react";
import { Checkbox, Tooltip } from "antd";
import EditTodoButton from "./EditTodoButton";
import DeleteTodoButton from "./DeleteTodoButton";

interface TodoListItemProps {
  task: any;
  getCategoryColor: (category: string) => string;
  onToggle: (id: string) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ task, getCategoryColor, onToggle }) => (
  <div
    className="rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer md:min-h-[150px]"
    style={{ backgroundColor: getCategoryColor(task.category || 'default') }}
  >
    <div className="flex justify-between items-start mb-4">
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="!text-gray-600"
      />
      <div className="flex items-center gap-2">
        <EditTodoButton task={task} />
        <DeleteTodoButton taskId={task.id} />
      </div>
    </div>
    <div>
      <div className="hidden md:block">
        <Tooltip title={task.title} placement="topLeft">
          <h3
            className={`font-bold text-gray-900 mb-3 text-lg ${task.completed ? 'line-through text-gray-400' : ''} truncate cursor-pointer`}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
            }}
          >
            {task.title}
          </h3>
        </Tooltip>
      </div>
      <div className="block md:hidden">
        <Tooltip title={task.title} placement="topRight">
          <h3
            className={`font-bold text-gray-900 mb-3 text-lg ${task.completed ? 'line-through text-gray-400' : ''} cursor-pointer`}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%'
            }}
            onClick={e => e.stopPropagation()}
          >
            {task.title}
          </h3>
        </Tooltip>
      </div>
    </div>
    <div className="hidden md:block">
      <Tooltip title={task.description || "No description available"} placement="topLeft">
        <p
          className="text-gray-600 text-sm mb-4 leading-relaxed truncate overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            maxHeight: '3em'
          }}
        >
          {task.description || "No description available"}
        </p>
      </Tooltip>
    </div>
    <div className="flex justify-between items-center mt-auto">
      <div className="text-gray-500 text-sm">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
      </div>
      {task.category && (
        <span className="text-xs bg-white bg-opacity-50 text-gray-700 px-2 py-1 rounded-full">
          {task.category}
        </span>
      )}
    </div>
  </div>
);

export default TodoListItem;