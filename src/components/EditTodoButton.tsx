// src/components/EditTodoButton.tsx
import React, { useState, useContext } from "react";
import { Modal, Input, DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TaskContext } from "../context/TaskContext";
import { useCategories } from "../context/CategoryContext";
import CategorySelector from "./CategorySelector";
import AddCategory from "./AddCategory";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Category } from "../context/CategoryContext";

const { TextArea } = Input;

interface EditTodoButtonProps {
  task: { 
    id: string; 
    title: string; 
    description?: string; 
    dueDate?: string; 
    category: string; 
  };
}

const EditTodoButton: React.FC<EditTodoButtonProps> = ({ task }) => {
  const { state, dispatch } = useContext(TaskContext)!;
  const { categories, setCategories } = useCategories();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  
  // Form state
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDueDate, setEditDueDate] = useState<Dayjs | null>(null);

  const handleEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditCategory(task.category);
    setEditDueDate(task.dueDate ? dayjs(task.dueDate) : null);
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
            title: editTitle.trim(),
            description: editDescription.trim() || undefined,
            category: editCategory,
            dueDate: editDueDate?.toISOString() || undefined,
          }
        });
      }
      setIsModalVisible(false);
      resetForm();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setEditTitle("");
    setEditDescription("");
    setEditCategory("");
    setEditDueDate(null);
  };

  const handleDeleteCategory = (categoryValue: string) => {
    setCategories(categories.filter((cat: Category) => cat.value !== categoryValue));
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
        width={500}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Enter title"
              onPressEnter={handleSave}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <TextArea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <CategorySelector
              categories={categories}
              value={editCategory}
              onChange={setEditCategory}
              onDelete={handleDeleteCategory}
              onAdd={() => setIsAddCategoryModalVisible(true)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <DatePicker
              value={editDueDate}
              onChange={(date) => setEditDueDate(date)}
              placeholder="Select due date (optional)"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Modal>

      <AddCategory 
        isVisible={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
      />
    </>
  );
};

export default EditTodoButton;