import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Category {
  value: string;
  label: string;
  color: string;
}

interface CategoryContextType {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  // initialize with default categories or from localstorage
  const [categories, setCategoriesState] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories && savedCategories !== 'null') {
      try {
        return JSON.parse(savedCategories);
      } catch (error) {
        console.error('Error parsing categories from localStorage:', error);
      }
    }
    // default categories
    return [
      { value: 'personal', label: 'Personal', color: '#1890ff' },
      { value: 'work', label: 'Work', color: '#52c41a' },
      { value: 'shopping', label: 'Shopping', color: '#fa8c16' },
    ];
  });

  // save categories to localstorage when they change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const setCategories = (newCategories: Category[]) => {
    setCategoriesState(newCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}; 