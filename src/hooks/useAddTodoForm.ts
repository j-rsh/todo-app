import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useCategories } from "../context/CategoryContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { Dayjs } from 'dayjs';

export function useAddTodoForm(onClose?: () => void) {
  const { dispatch } = useContext(TaskContext)!;
  const { categories, setCategories } = useCategories();
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: 'All',
      dueDate: null as Dayjs | null
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().max(30, 'Description too long'),
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
      if (onClose) onClose();
    }
  });

  const handleDeleteCategory = (categoryValue: string) => {
    setCategories(categories.filter(cat => cat.value !== categoryValue));
    if (formik.values.category === categoryValue) {
      formik.setFieldValue('category', categories[0]?.value || 'All');
    }
  };

  return {
    formik,
    categories,
    isAddCategoryModalVisible,
    setIsAddCategoryModalVisible,
    handleDeleteCategory,
  };
} 