import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useCategories } from "../context/CategoryContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { Dayjs } from 'dayjs';

// custom hook to manage the Add Todo form logic
export function useAddTodoForm(onClose?: () => void) {
  const { dispatch } = useContext(TaskContext)!;

  // get categories and the function to update them from CategoryContext
  const { categories, setCategories } = useCategories();

  // state to control the visibility of the "Add Category" modal
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);

  // formik hook to manage form state, validation, and submission
  const formik = useFormik({
    initialValues: {
      title: '',                
      description: '',         
      category: 'no category',  
      dueDate: null as Dayjs | null 
    },
    // validation schema using Yup
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().max(40, 'Description too long'),
      category: Yup.string().required('Category is required')
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: Date.now().toString(), 
          title: values.title,
          description: values.description,
          category: values.category,
          dueDate: values.dueDate?.toISOString() || undefined, 
          completed: false,
          createdAt: new Date().toISOString(), 
        },
      });
      resetForm(); 
      if (onClose) onClose()
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

  // function to handle when a new category is added
  const handleCategoryAdded = (categoryValue: string) => {
    formik.setFieldValue('category', categoryValue);
  };

  return {
    formik,                        
    categories,                  
    isAddCategoryModalVisible,     
    setIsAddCategoryModalVisible,  
    handleDeleteCategory,          
    handleCategoryAdded,      
  };
} 