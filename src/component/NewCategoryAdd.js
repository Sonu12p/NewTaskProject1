import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../reduxe/categories";

export const NewCategoryAdd = () => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCategory.trim() !== "") {
      // Dispatch the addNewCategory action with the new category
      dispatch(addNewCategory(newCategory));

      // Clear the input field after adding the category
      setNewCategory("");
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input type="text" value={newCategory} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};
