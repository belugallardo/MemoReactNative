import { configureStore } from '@reduxjs/toolkit'
import tareasReducer from "../fectures/tareas/tareasSlice"
import { apiMemoSlice } from '../fectures/api/apiSlice'
import { apiAut } from '../fectures/autenticacion/autenticacion'
import authReducer from '../fectures/estadoAutenticacion/estadoAutenticacion'


export const store = configureStore({
  reducer: {
    tareas:tareasReducer,
    actividad: apiMemoSlice.reducer,  
    auth:authReducer,
    [apiMemoSlice.reducerPath]: apiMemoSlice.reducer,
    [apiAut.reducerPath]: apiAut.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiMemoSlice.middleware,apiAut.middleware)
})