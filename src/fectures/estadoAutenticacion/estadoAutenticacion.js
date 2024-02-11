import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: null,
        idToken: null
    }
}

export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value.email = action.payload.email;
            state.value.idToken = action.payload.idToken;  
            console.log("Esto esta en estado redux login",state.value)
        }
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
