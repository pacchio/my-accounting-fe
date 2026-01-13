import { apiSlice } from './apiSlice';

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  enabled: boolean;
  registration_date: string;
  roles: string[];
}

export interface GetUsersResponse {
  users: User[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export interface GetUsersParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users with pagination and search
    getUsers: builder.query<GetUsersResponse, GetUsersParams>({
      query: ({ pageIndex = 0, pageSize = 50, search = '' } = {}) => {
        const params = new URLSearchParams();
        params.append('pageIndex', pageIndex.toString());
        params.append('pageSize', pageSize.toString());
        if (search) {
          params.append('search', search);
        }
        return `/admin/users?${params.toString()}`;
      },
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery } = adminApi;

