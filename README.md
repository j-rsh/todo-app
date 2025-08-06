# Todo App

A modern, feature-rich todo application built with React, TypeScript, and Tailwind CSS. This application helps you organize your tasks with categories, search functionality, and a clean, responsive interface.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Category Organization**: Organize tasks into customizable categories (Personal, Work, Shopping, etc.)
- **Category Colors**: Choose custom colors for each category to visually distinguish them
- **Search Functionality**: Quickly find tasks using the search bar
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Your tasks and categories are automatically saved locally
- **Modern UI**: Built with Ant Design components and Tailwind CSS for a beautiful interface
- **TypeScript**: Full type safety for better development experience

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.4.0 + Ant Design 5.26.7
- **State Management**: React Context API + useReducer
- **Form Handling**: Formik 2.4.6 + Yup 1.7.0
- **Routing**: React Router DOM 7.7.1
- **Build Tool**: Create React App 5.0.1

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Adding Tasks
- Click the "Add Todo" button to open the task creation modal
- Fill in the task title and select a category
- Click "Add Task" to save

### Managing Tasks
- **Complete a task**: Click the checkbox next to any task
- **Edit a task**: Click the edit icon to modify task details
- **Delete a task**: Click the delete icon to remove a task
- **Search tasks**: Use the search bar to find specific tasks

### Managing Categories
- **Filter by category**: Use the category tabs to view tasks by category
- **Add new categories**: Use the category management features to create custom categories

### Responsive Features
- **Mobile**: Tasks are displayed in a card layout with 3 cards per row
- **Desktop**: Tasks are displayed in a grid layout with 3 tasks per row
- **Load More**: Click "Load More" to display additional tasks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTodo.tsx     # Task creation component
│   ├── TodoList.tsx    # Main task list component
│   ├── TodoListItem.tsx # Individual task item
│   ├── CategoryTabs.tsx # Category filtering tabs
│   └── ...
├── context/            # React Context providers
│   ├── TaskContext.tsx # Task state management
│   └── CategoryContext.tsx # Category state management
├── features/           # Reducer logic
│   └── tasksReducer.tsx # Task state reducer
├── pages/              # Page components
│   └── Home.tsx        # Main application page
└── hooks/              # Custom React hooks
```

##  Code Documentation

The codebase is thoroughly documented with comprehensive comments to ensure clarity and maintainability:

- **Inline Comments**: Detailed explanations for complex logic and business rules

This documentation makes the codebase accessible to new developers and helps maintain code quality during future updates.

##  Building for Production

Create a production build:
```bash
npm run build
# or
yarn build
```

The build files will be created in the `build/` directory, ready for deployment.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Data Persistence

The application uses browser localStorage to persist:
- Task data (title, completion status, category)
- Category configurations (name, color, value)

Your data will persist between browser sessions and page refreshes.

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize the appearance by modifying:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles
- Component-specific CSS classes

### Categories
Default categories can be modified in `src/context/CategoryContext.tsx`. Each category includes:
- `value`: Unique identifier
- `label`: Display name
- `color`: Hex color code for visual distinction


## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- UI components from [Ant Design](https://ant.design/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Form handling with [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup)
