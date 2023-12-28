import { configureStore } from '@reduxjs/toolkit'
import tareasReducer from "../fectures/tareas/tareasSlice"


export const store = configureStore({
  reducer: {
    tareas:tareasReducer
  },
})