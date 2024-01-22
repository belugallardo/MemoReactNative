import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiMemoSlice = createApi({
  reducerPath: 'apiMemo',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://memo-back-dev-zkmd.1.ie-1.fl0.io' }),
  endpoints: builder => ({
    getActividad: builder.query({
      query: () => '/actividad/params'
    }),
    createActividad: builder.mutation({
      query: (newActividad) => {
        console.log('Solicitud POST:', newActividad); // Agrega este console.log
        return {
          url: '/actividad/post/admin',
          method: 'POST',
          body: newActividad,
        };
      },
    }),
  }),
});

export const { useGetActividadQuery, useCreateActividadMutation } = apiMemoSlice;
