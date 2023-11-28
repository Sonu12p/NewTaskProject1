// categories.js

import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem('taskCatogoriesLocal')) || []

const initialState = {
    value : data
}
const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addNewCategory: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteCategory: (state, action) => {
      state.value = state.value.filter((category) => category !== action.payload);
    },
    editCategory: (state, action) => {
      const { oldCategory, newCategory } = action.payload;
      const index = state.value.indexOf(oldCategory);
      if (index !== -1) {
        state.value[index] = newCategory;
      }
    },
  },
});

export const { addNewCategory, deleteCategory, editCategory } = slice.actions;
export default slice.reducer;
