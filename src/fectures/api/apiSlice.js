
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiMemoSlice = createApi({

  reducerPath: 'apiMemo',
 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://memo-back-dev-zkmd.1.ie-1.fl0.io' }),
  
  endpoints: builder => ({
  
    getActividad: builder.query({
    
      query: () => '/actividad/params'
    })
  })
})


export const { useGetActividadQuery } = apiMemoSlice