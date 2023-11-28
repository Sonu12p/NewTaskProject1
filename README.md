## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Task Management Application - Components Overview

This application is a task management system consisting of various components to manage tasks and categories. Each component has specific functionalities that contribute to the overall management of tasks and categories within the application.
 
## Components
## 1. NewTaskAdd Component

This component allows users to add a new task with the following functionalities:

Input fields for Task Name, Category, and Description
Selection dropdown for choosing categories from existing categories
Form submission for adding a new task
Navigation back to the home page

## 2. NewCategoryAdd Component

This component enables users to add new categories to the application:

Input field to add a new category name
Form submission for adding a new category

## 3. Home Component
The Home component is the main dashboard displaying the task list. It includes functionalities like:

Viewing a list of tasks
Pagination for managing and navigating through multiple pages of tasks
Sorting tasks by name, category, or last edit date
Searching tasks by name or description
Editing and deleting individual tasks
Navigation to add a new task or manage categories

## 4. EditTask Component
The EditTask component provides the functionality to edit existing tasks:

Input fields for editing Task Name, Category, and Description
Selection dropdown for choosing categories from existing categories
Form submission to update the task details
Navigation back to the home page after editing

## 5. Category Component
This component manages categories:

Displaying a list of existing categories
Adding new categories
Editing and deleting individual categories

## 6. EditCategory Component
This component allows editing existing categories:

Input field for editing category name
Form submission to update the category details
Navigation back to the category list after editing.

## Redux and Local Storage
The application utilizes Redux for state management, storing task data, categories, and the current task being edited in the Redux store. Additionally, the application synchronizes data with local storage to maintain persistence between sessions.

## Routing
Routing is implemented using React Router DOM to navigate between different components/pages within the application.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
