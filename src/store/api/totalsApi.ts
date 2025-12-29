import { apiSlice } from './apiSlice';
import type {
  Total,
  TotalUpdateRequest,
  TotalByDescriptionResponse,
  TotalByDescriptionByYearResponse,
} from '@/types';

export const totalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all account balances
    getTotals: builder.query<Total[], void>({
      query: () => '/totals',
      providesTags: ['Totals'],
    }),

    // Update account balances
    updateTotals: builder.mutation<Total[], TotalUpdateRequest[]>({
      query: (totals) => ({
        url: '/update-totals',
        method: 'POST',
        body: totals,
      }),
      invalidatesTags: ['Totals'],
    }),

    // Get totals by description (all time)
    getTotalsByDescriptionAll: builder.query<TotalByDescriptionResponse, void>({
      query: () => '/total-by-description-all',
      providesTags: ['Totals'],
    }),

    // Get totals by description for a specific year
    getTotalsByDescriptionByYear: builder.query<TotalByDescriptionByYearResponse, string>({
      query: (year) => `/total-by-description/${year}`,
      providesTags: ['Totals'],
    }),
  }),
});

export const {
  useGetTotalsQuery,
  useUpdateTotalsMutation,
  useGetTotalsByDescriptionAllQuery,
  useGetTotalsByDescriptionByYearQuery,
} = totalsApi;
