import React, { useContext, useState, useEffect, useRef } from "react";
import { TaskContext } from "../context/TaskContext";
import { useCategories } from "../context/CategoryContext";
import CategoryTabs from "./CategoryTabs";
import LoadMoreButton from "./LoadMoreButton";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  searchTerm?: string;
}

const TodoList: React.FC<TodoListProps> = ({ searchTerm = "" }) => {
  const { state, dispatch } = useContext(TaskContext)!;
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // state for selected category and load more functionality
  const [mobileCardsToShow, setMobileCardsToShow] = useState(3);
  const [desktopRowsToShow, setDesktopRowsToShow] = useState(2);
  
  // Track if user manually changed category
  const userManuallyChangedCategory = useRef(false);
  const previousSearchTerm = useRef("");

  // Reset load more state when search or category changes
  useEffect(() => {
    setMobileCardsToShow(3);
    setDesktopRowsToShow(2);
  }, [searchTerm, selectedCategory]);

  // Auto-switch to "all" category when searching
  useEffect(() => {
    if (searchTerm !== "") {
      // Get all tasks that match the search
      const searchResults = state.tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // If there are search results, switch to "all" to show all matching results
      if (searchResults.length > 0) {
        setSelectedCategory("all");
      }
    }
  }, [searchTerm, state.tasks]);

  // filter tasks by category and search term
  const filteredTasks = state.tasks.filter(task => {
    // If there's a search term, search across all categories
    if (searchTerm !== "") {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }
    
    // If no search term, filter by selected category only
    return selectedCategory === "all" || task.category === selectedCategory;
  });
  
  // Check if there are no tasks
  const hasNoTasks = filteredTasks.length === 0;

  // calculate how many tasks to show based on screen size
  const mobileLimit = mobileCardsToShow;
  const desktopLimit = desktopRowsToShow * 3;
  const currentLimit = window.innerWidth >= 768 ? desktopLimit : mobileLimit;

  // Slice tasks based on current limit
  const displayedTasks = filteredTasks.slice(0, currentLimit);
  const hasMoreTasks = filteredTasks.length > currentLimit;

  // get color for category background
  const getCategoryColor = (category: string) => {
    const foundCategory = categories.find(cat => cat.value === category);
    if (foundCategory) {
      const hex = foundCategory.color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, 0.1)`;
    }
    return 'bg-gray-100';
  };

  // toggle task completion
  const handleToggle = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  // handle load more button click
  const handleLoadMore = () => {
    if (window.innerWidth >= 768) {
      setDesktopRowsToShow(prev => prev + 2);
    } else {
      setMobileCardsToShow(prev => prev + 3);
    }
  };

  // handle category change
  const handleCategoryChange = (category: string) => {
    userManuallyChangedCategory.current = true;
    setSelectedCategory(category);
  };

  return (
    // main container
    <div className="">
      {/* category filter tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* show message when no tasks exist */}
      {hasNoTasks ? (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="text-gray-400 text-6xl mb-4">🙂</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm !== "" ? "No todos found" : "No todos exist"}
          </h3>
          <p className="text-gray-500 break-words max-w-full overflow-hidden">
            {searchTerm !== "" 
              ? `No todos match "${searchTerm}" in the "${selectedCategory === 'all' ? 'all' : categories.find(cat => cat.value === selectedCategory)?.label}" category`
              : selectedCategory === 'all' 
                ? "Start by adding your first todo!" 
                : `No todos in the "${categories.find(cat => cat.value === selectedCategory)?.label}" category`
            }
          </p>
        </div>
      ) : (
        <>
          {/* task cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTasks.map((task) => (
              <TodoListItem
                key={task.id}
                task={task}
                getCategoryColor={getCategoryColor}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* load more button */}
          <LoadMoreButton 
            hasMoreTasks={hasMoreTasks}
            onLoadMore={handleLoadMore}
          />
        </>
      )}
    </div>
  );
};

export default TodoList;
