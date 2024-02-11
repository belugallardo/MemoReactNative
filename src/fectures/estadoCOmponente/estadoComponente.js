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
            console.log("Esto está en el estado de Redux", state);
        },
    },
});

export const { setDia } = seteoDia.actions;

export default seteoDia.reducer;