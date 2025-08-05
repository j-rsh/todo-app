import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import { TaskProvider } from "./context/TaskContext";
import Home from "./pages/Home";

function App() {
  return (
    <CategoryProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Router>
      </TaskProvider>
    </CategoryProvider>
  );
}

export default App;
