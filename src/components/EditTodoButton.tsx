// src/components/EditTodoButton.tsx
import React, { useState, useContext } from "react";
import { Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TaskContext } from "../context/TaskContext";

interface EditTodoButtonProps {
  task: { id: string; title: string };
}

const EditTodoButton: React.FC<EditTodoButtonProps> = ({ task }) => {
  const { state, dispatch } = useContext(TaskContext)!;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const handleEdit = () => {
    setEditTitle(task.title);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      const currentTask = state.tasks.find(t => t.id === task.id);
      if (currentTask) {
        dispatch({ 
          type: "EDIT_TASK", 
          payload: {
            ...currentTask,
            title: editTitle.trim()
          }
        });
      }
      setIsModalVisible(false);
      setEditTitle("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTitle("");
  };

  return (
    <>
      <EditOutlined
        className="text-gray-600 hover:text-blue-500 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
      />
      
      <Modal
        title="Edit Todo"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-blue-500 hover:bg-blue-600"
        }}
      >
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Enter new title"
          onPressEnter={handleSave}
        />
      </Modal>
    </>
  );
};

export default EditTodoButton;