import { configureStore } from "@reduxjs/toolkit";
import taskData from "./dataslice";
import catSlice from "./categories";
import editTaskslice from "./edittaskslice";

const store = configureStore({
  reducer: {
    tasks: taskData,
    catogories: catSlice,
    currEditTask: editTaskslice,
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "taskCatogoriesLocal",
    JSON.stringify(store.getState().catogories.value)
  );
  localStorage.setItem(
    "tasksLocal",
    JSON.stringify(store.getState().tasks.value)
  );
});

export default store;
