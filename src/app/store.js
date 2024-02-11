import { configureStore } from '@reduxjs/toolkit'
import tareasReducer from "../fectures/tareas/tareasSlice"
import { apiMemoSlice } from '../fectures/api/apiSlice'
import { apiAut } from '../fectures/autenticacion/autenticacion'
import authReducer from '../fectures/estadoAutenticacion/estadoAutenticacion'
import seteoDiaReducer, { setDia } from '../fectures/estadoCOmponente/estadoComponente'; // Asegúrate de importar setDia y seteoDiaReducer correctamente


export const store = configureStore({
  reducer: {
    tareas:tareasReducer,
    api: apiMemoSlice.reducer, 
    auth:authReducer,
    setdia: seteoDiaReducer,
    [apiMemoSlice.reducerPath]: apiMemoSlice.reducer,
    [apiAut.reducerPath]: apiAut.reducer,

  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiMemoSlice.middleware,apiAut.middleware)
})