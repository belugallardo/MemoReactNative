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
        return {
          url: '/actividad/post/admin',
          method: 'POST',
          body: newActividad,
        };
      },
    }),
    createUser: builder.mutation({
      query: (email) => {
        return {
          url: '/login/registerMovilUser',
          method: 'POST',
          body: email,
        };
      },
    }),
    addPictograma: builder.mutation({
      query: (data) => {
        return {
          url: '/rutinas/update',
          method: 'POST',
          body: data,
        };
      },
    }),
    getRutinaEmail: builder.query({
      query: (email) => {
        return `/rutinas/${email}`;
      },
    }),

    editPicto: builder.mutation({
      query: (data) => {
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
        return{
          url:`/login/update/${email}`,
          method:'POST',
          body: avatar,
        }
      }
    }),
    getUser: builder.query({
      query: (email) => {
        return `/login/users/${email}`;
      },
    }),
  }),
});

export const { useGetActividadQuery, useCreateActividadMutation, useCreateUserMutation, useAddPictogramaMutation, useGetRutinaEmailQuery, useEditPictoMutation, useEditCarnetMutation, useEditAvatarMutation, useGetUserQuery } = apiMemoSlice;
