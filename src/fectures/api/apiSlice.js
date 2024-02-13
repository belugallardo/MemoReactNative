import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiMemoSlice = createApi({
  reducerPath: 'apiMemo',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://memo-back-dev-zkmd.1.ie-1.fl0.io/api' }),
  endpoints: builder => ({
    getActividad: builder.query({
      query: (params) => `/actividad/params?categoria=${params.categoria}`,
    }),
    createActividad: builder.mutation({
      query: (newActividad) => {
        console.log('Solicitud POST:', newActividad); 
        return {
          url: '/actividad/post/admin',
          method: 'POST',
          body: newActividad,
        };
      },
    }),
    createUser: builder.mutation({
      query: (email) => {
        console.log('Solicitud POST:', email); 
        return {
          url: '/login/registerMovilUser',
          method: 'POST',
          body: email,
        };
      },
    }),
    addPictograma: builder.mutation({
      query: (data) => {
        console.log('Solicitud POST add:', data); 
        return {
          url: '/rutinas/update',
          method: 'POST',
          body: data,
        };
      },
    }),
    getRutinaEmail: builder.query({
      query: (email) => {
        console.log('Solicitud GET Rutina por Email:', email); 
        return `/rutinas/${email}`;
      },
    }),

    editPicto: builder.mutation({
      query: (data) => {
        console.log('Solicitud POST:', data); 
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
    }),
    editAvatar: builder.mutation({
      query:(data) => {
        const email = data.email;
        const avatar = data.avatar;
        console.log('esto es data', data)
        console.log('Solicitud post avatar', email, 'esto es avatar', avatar);
        return{
          url:`/login/update/${email}`,
          method:'POST',
          body: avatar,
        }
      }
    }),
    getUser: builder.query({
      query: (email) => {
        console.log('Solicitud GET user por Email:', email); 
        return `/login/users/${email}`;
      },
    }),
  }),
});

export const { useGetActividadQuery, useCreateActividadMutation, useCreateUserMutation, useAddPictogramaMutation, useGetRutinaEmailQuery, useEditPictoMutation, useEditCarnetMutation, useEditAvatarMutation, useGetUserQuery } = apiMemoSlice;
