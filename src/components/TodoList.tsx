import React, { useContext, useState, useEffect } from "react";
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

  // to auto-switch to 'all' category when searching and no results in current category
  useEffect(() => {
    if (searchTerm !== "") {
      // Check if search results exist in current category
      const resultsInCurrentCategory = state.tasks.filter(task => {
        const matchesCategory = selectedCategory === "all" || task.category === selectedCategory;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      
      // Only switch to "all" if no results found in current category
      if (resultsInCurrentCategory.length === 0) {
        setSelectedCategory("all");
      }
    }
  }, [searchTerm, selectedCategory, state.tasks]);

  // filter tasks by category and search term
  const filteredTasks = state.tasks.filter(task => {
    // If there's a search term, search across all categories
    if (searchTerm !== "") {
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    // main container
    <div className="">
      {/* category filter tabs */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
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
              ? `No todos match "${searchTerm}"`
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
