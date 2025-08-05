import { Button } from "antd";
import AddCategory from "./AddCategory";
import React from 'react';
import TodoFormFields from "./TodoFormFields";
import { useAddTodoForm } from "../hooks/useAddTodoForm";

const AddTodo: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { formik, categories, isAddCategoryModalVisible, setIsAddCategoryModalVisible, handleDeleteCategory } = useAddTodoForm(onClose);

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={formik.handleSubmit}>
        <TodoFormFields
          formik={formik}
          categories={categories}
          onDeleteCategory={handleDeleteCategory}
          onAddCategory={() => setIsAddCategoryModalVisible(true)}
        />
        <Button
          type="primary"
          htmlType="submit"
          block
          className="bg-blue-500 hover:bg-blue-600 mt-4"
          onClick={() => {
            formik.handleSubmit();
            if (Object.keys(formik.errors).length > 0) {
              formik.setTouched({
                title: true,
                description: true,
                category: true,
                dueDate: true,
              });
            }
          }}
        >
          Add Todo
        </Button>
      </form>
      <AddCategory 
        isVisible={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
      />
    </div>
  );
};

export default AddTodo;