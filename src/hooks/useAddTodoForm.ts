import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useCategories } from "../context/CategoryContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { Dayjs } from 'dayjs';

// Custom hook to manage the Add Todo form logic
export function useAddTodoForm(onClose?: () => void) {
  // Get the dispatch function from TaskContext to update tasks
  const { dispatch } = useContext(TaskContext)!;

  // Get categories and the function to update them from CategoryContext
  const { categories, setCategories } = useCategories();

  // State to control the visibility of the "Add Category" modal
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);

  // Formik hook to manage form state, validation, and submission
  const formik = useFormik({
    initialValues: {
      title: '',                // Task title
      description: '',          // Task description
      category: 'no category',  // Default category
      dueDate: null as Dayjs | null // Due date (optional, using Dayjs)
    },
    // Validation schema using Yup
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().max(30, 'Description too long'),
      category: Yup.string().required('Category is required')
    }),
    // happens when the form is submitted
    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: Date.now().toString(), // Unique ID based on timestamp
          title: values.title,
          description: values.description,
          category: values.category,
          dueDate: values.dueDate?.toISOString() || undefined, // Convert Dayjs to ISO string if present
          completed: false,
          createdAt: new Date().toISOString(), // Timestamp for creation
        },
      });
      resetForm(); // reset the form fields
      if (onClose) onClose(); //close the modal/dialog if provided
    }
  });

  // function to handle deleting a category
  const handleDeleteCategory = (categoryValue: string) => {
    // remove the category from the list
    setCategories(categories.filter(cat => cat.value !== categoryValue));
    // if the currently selected category is deleted, reset to the first category or 'All'
    if (formik.values.category === categoryValue) {
      formik.setFieldValue('category', categories[0]?.value || 'All');
    }
  };

  return {
    formik,                        // formik object for form state and helpers
    categories,                    // list of categories
    isAddCategoryModalVisible,     // state for add category modal visibility
    setIsAddCategoryModalVisible,  // setter for modal visibility
    handleDeleteCategory,          // handler to delete a category
  };
} 