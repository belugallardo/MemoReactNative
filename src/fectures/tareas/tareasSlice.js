import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
};

export const tareasSlice = createSlice({
    name: 'tareas',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks.splice(action.payload, 1);
        },
    },
});

export const { addTask, deleteTask } = tareasSlice.actions;

export default tareasSlice.reducer;
