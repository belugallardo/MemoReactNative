import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value:{
        dia: null,
        momento: null
    }
};

export const seteoDia = createSlice({
    name: 'setDia', 
    initialState,
    reducers: {
        setDia: (state, action) => {
            state.value.dia = action.payload.dia;
            state.value.momento = action.payload.momento;
        },
    },
});

export const { setDia } = seteoDia.actions;

export default seteoDia.reducer;