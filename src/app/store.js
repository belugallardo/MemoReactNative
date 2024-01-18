import { configureStore } from '@reduxjs/toolkit'
import tareasReducer from "../fectures/tareas/tareasSlice"
import { apiMemoSlice } from '../fectures/api/apiSlice'



export const store = configureStore({
  reducer: {
    tareas:tareasReducer,
    actividad: apiMemoSlice.reducer,  
    [apiMemoSlice.reducerPath]: apiMemoSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiMemoSlice.middleware)
})