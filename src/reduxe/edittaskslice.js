import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name : "edittaskslice",
    initialState :{
        value : undefined
    },
    reducers :{
        editTaskInStore : (state,action) => {
            state.value = action.payload
        }
    }
})

export const {editTaskInStore} = slice.actions
export default slice.reducer;