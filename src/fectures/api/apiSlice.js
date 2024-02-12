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
    }),
    getRutinaEmail: builder.query({
      query: (email) => {
        console.log('Solicitud GET Rutina por Email:', email); // Add this console.log
        return `/rutinas/${email}`;
      },
    }),

    editPicto: builder.mutation({
      query: (data) => {
        console.log('Solicitud POST:', data); // Agrega este console.log
        return {
          url: '/rutinas/editArray',
          method: 'POST',
          body: data,
        };
      },
    }),
    editCarnet: builder.mutation({
      query:(data) => {
        const email = data.email;
        const carnet = data.card;
        
        console.log('Solicitud post carnet', email, 'esto es el carnet', carnet);
        return{
          url: `/login/update/${email}`,
          method: 'POST',
          body: carnet,
        }
      }
    }) 
  }),
});

export const { useGetActividadQuery, useCreateActividadMutation, useCreateUserMutation, useAddPictogramaMutation, useGetRutinaEmailQuery, useEditPictoMutation, useEditCarnetMutation } = apiMemoSlice;
