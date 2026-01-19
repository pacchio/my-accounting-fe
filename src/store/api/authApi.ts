import { apiSlice } from './apiSlice';
import type {
  LoginRequest,
  LoginResponse,
  UserInfo,
  RegistrationRequest,
  GoogleLoginRequest,
} from '@/types';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    googleLogin: builder.mutation<LoginResponse, GoogleLoginRequest>({
      query: (data) => ({
        url: '/auth/google',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    getUserInfo: builder.query<UserInfo, void>({
      query: () => '/user-info',
      providesTags: ['Auth'],
    }),
    register: builder.mutation<void, RegistrationRequest>({
      query: (data) => ({
        url: '/registration',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useRegisterMutation,
} = authApi;
