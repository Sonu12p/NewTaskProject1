// Category.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../reduxe/categories";
import { MdDelete } from "react-icons/md";
import "./Category.css";
export const Category = () => {
  const categories = useSelector((state) => state.catogories.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCategory = () => {
    navigate("/categories/add-new-category");
  };

  const editCategory = (categoryId) => {
    // Navigate to the edit category route with the category ID
    navigate(`/categories/edit-category/${categoryId}`);
  };

  const handleDelete = (category) => {
    // Dispatch the deleteCategory action with the category to be deleted
    dispatch(deleteCategory(category));
  };

  return (
    <div>
      <button onClick={addCategory}>Add New Category</button>
      <h2>Category List</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category}
            <button
              className="category_list_edit_button"
              onClick={() => editCategory(category)}
            >
              <MdModeEditOutline />
            </button>
            <button onClick={() => handleDelete(category)}>
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
