import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory } from "../reduxe/categories";
import "./EditCategory.css"

export const EditCategory = () => {
  
  const { slug } = useParams();
  const categoryId = slug;

  const categories = useSelector((state) => state.catogories.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the selected category based on the categoryId
  const selectedCategory = categories.find(
    (category) => category === categoryId
  );

  // State to track the edited category name
  const [editedCategory, setEditedCategory] = useState(selectedCategory || "");

  // Handle form submission to edit the category
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the editCategory action with old and new category names
    dispatch(
      editCategory({
        oldCategory: selectedCategory,
        newCategory: editedCategory,
      })
    );

    // Navigate back to the category list
    navigate("/category");
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
