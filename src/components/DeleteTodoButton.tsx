// src/components/DeleteTodoButton.tsx
import React, { useContext } from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { TaskContext } from "../context/TaskContext";

interface DeleteTodoButtonProps {
  taskId: string;
}

const DeleteTodoButton: React.FC<DeleteTodoButtonProps> = ({ taskId }) => {
  const { dispatch } = useContext(TaskContext)!;

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <Popconfirm
      title="Delete this todo?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
      okButtonProps={{
        className: "bg-blue-500 hover:bg-blue-600"
      }}
    >
      <DeleteOutlined 
        className="text-gray-600 hover:text-red-500 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      />
    </Popconfirm>
  );
};

export default DeleteTodoButton;