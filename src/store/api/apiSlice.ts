import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

// Define base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Base query with error handling and auto-logout on 401
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized - logout user
  if (result.error && result.error.status === 401) {
    api.dispatch({ type: 'auth/logout' });

    // Redirect to login (client-side only)
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return result;
};

// Create the API slice - all endpoints will be injected into this
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Transactions', 'Totals', 'Descriptions', 'Users'],
  endpoints: () => ({}), // Endpoints will be injected in separate files
});
