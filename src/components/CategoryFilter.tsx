import { Button } from "antd";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { key: "all", label: "All" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category.key}
          type={selectedCategory === category.key ? "primary" : "default"}
          onClick={() => onCategoryChange(category.key)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter; 