import { useState } from "react";
import AddTodoModalWrapper from "../components/AddTodoModalWrapper";
import TodoList from "../components/TodoList";
import SearchTodos from "../components/SearchTodos";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-screen-2xl mx-auto max-h-full p-6">
      <h2 className="text-xl font-bold mb-3">Todo List</h2>
      <br />

      <div className="flex mb-6 justify-between ">
          <SearchTodos 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
      <AddTodoModalWrapper />
      </div>
      
      <TodoList searchTerm={searchTerm} />
      

    </div>
  );
};

export default Home;
