import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth_base_url, api_key } from '../../Config/Firebase/Firebase';

export const apiAut = createApi({
    reducerPath: 'apiAut',
    baseQuery: fetchBaseQuery({ baseUrl: auth_base_url }),
    endpoints: builder => ({
        Signup: builder.mutation({
            query: (user) => ({
                url: `accounts:signUp?key=${api_key}`,
                method: 'POST',
                body: user,
            }),
        }),
        Login: builder.mutation({
            query: (user) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: 'POST',
                body: user,
            }),
        })
    }),
})

export const {  useSignupMutation,useLoginMutation } = apiAut;