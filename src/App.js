import { Route, Routes } from "react-router-dom";
import NewTaskAdd from "./component/NewTaskAdd";
import Home from "./component/Home";
import EditTask from "./component/EditTask";
import "./App.css";
import { NewCategoryAdd } from "./component/NewCategoryAdd";
import { Category } from "./component/Category";
import { EditCategory } from "./component/EditCategory";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/add-new-task" element={<NewTaskAdd />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/categories/add-new-category"
          element={<NewCategoryAdd />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/edit-task" element={<EditTask />} />
        <Route
          path="/categories/edit-category/:slug"
          element={<EditCategory />}
        />
      </Routes>
    </>
  );
}
