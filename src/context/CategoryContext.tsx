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
  // Initialize with default categories and load from localStorage
  const [categories, setCategoriesState] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    // Default categories
    // return [
    //   { value: 'personal', label: 'Personal', color: '#1890ff' },
    //   { value: 'work', label: 'Work', color: '#52c41a' },
    //   { value: 'shopping', label: 'Shopping', color: '#fa8c16' },
    //   { value: 'health', label: 'Health', color: '#eb2f96' },
    // ];
  });

  // Save to localStorage whenever categories change
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