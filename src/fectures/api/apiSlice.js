import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiMemoSlice = createApi({
  reducerPath: 'apiMemo',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://memo-back-dev-zkmd.1.ie-1.fl0.io/api' }),
  endpoints: builder => ({
    getActividad: builder.query({
      query: (params) => `/actividad/params?categoria=${params.categoria}`,
      // query: () => '/actividad/params'
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
    createUser: builder.mutation({
      query: (email) => {
        console.log('Solicitud POST:', email); // Agrega este console.log
        return {
          url: '/login/registerMovilUser',
          method: 'POST',
          body: email,
        };
      },
    }),
    addPictograma: builder.mutation({
      query: (data) => {
        console.log('Solicitud POST add:', data); // Agrega este console.log
        return {
          url: '/rutinas/update',
          method: 'POST',
          body: data,
        };
      },
    })
  }),
});

export const { useGetActividadQuery, useCreateActividadMutation, useCreateUserMutation, useAddPictogramaMutation } = apiMemoSlice;
