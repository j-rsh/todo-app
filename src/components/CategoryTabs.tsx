import React from "react";
import { Tabs } from "antd";
import { useCategories } from "../context/CategoryContext";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategoryChange,
  className = ""
}) => {
  const { categories } = useCategories();

  const tabItems = [
    {
      key: 'all',
      label: 'All Tasks',
    },
    ...categories.map(cat => ({
      key: cat.value,
      label: (
        <span className="flex items-center gap-2">
          <span 
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: cat.color
            }} 
          />
          {cat.label}
        </span>
      )
    }))
  ];

  return (
    <div className={`mb-6 ${className}`}>
      <Tabs
        defaultActiveKey="all"
        activeKey={selectedCategory}
        onChange={onCategoryChange}
        items={tabItems}
        className="custom-tabs"
      />
    </div>
  );
};

export default CategoryTabs; 