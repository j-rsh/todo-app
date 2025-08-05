import React from "react";
import { Button } from "antd";

interface LoadMoreButtonProps {
  hasMoreTasks: boolean;
  onLoadMore: () => void;
  className?: string;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  hasMoreTasks, 
  onLoadMore, 
  className = "" 
}) => {
  if (!hasMoreTasks) return null;

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <Button 
        type="primary" 
        onClick={onLoadMore}
        size="large"
        className="bg-blue-500 hover:bg-blue-600 mt-4"
      >
        Load More
      </Button>
    </div>
  );
};

export default LoadMoreButton; 