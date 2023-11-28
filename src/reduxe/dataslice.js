import { createSlice } from "@reduxjs/toolkit";

const data = JSON.parse(localStorage.getItem('tasksLocal')) || []

const initialState = {
    value : data
}

const slice = createSlice({
    name : "taskData",
    initialState,
    reducers :{
        addNewTask : (state,action) => {
            state.value = [...state.value , action.payload];
        },
        deleteTaskFromStore : (state,action) => {
            state.value = state.value.filter(task => task.taskName != action.payload)
        }
    }
})

export const {addNewTask,deleteTaskFromStore} = slice.actions
export default slice.reducer;