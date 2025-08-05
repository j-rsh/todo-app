import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchTodosProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchTodos: React.FC<SearchTodosProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex-1 max-w-md">
      <Input
        placeholder="Search todos..."
        prefix={<SearchOutlined className="text-gray-400" />}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="large"
      />
    </div>
  );
};

export default SearchTodos; 