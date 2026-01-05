import { apiSlice } from './apiSlice';
import type { Description, DescriptionsResponse, UpdateDescriptionRequest } from '@/types';

export const descriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all descriptions (with optional occurrence counts)
    getDescriptions: builder.query<DescriptionsResponse, boolean>({
      query: (withOccurrences = false) => `/description-list?occurrences=${withOccurrences}`,
      providesTags: ['Descriptions'],
    }),

    // Update description
    updateDescription: builder.mutation<Description, UpdateDescriptionRequest>({
      query: (description) => ({
        url: '/update-description',
        method: 'POST',
        body: description,
      }),
      invalidatesTags: ['Descriptions', 'Transactions'],
    }),

    // Delete description
    deleteDescription: builder.mutation<void, number>({
      query: (id) => ({
        url: `/delete-description/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Descriptions'],
    }),
  }),
});

export const {
  useGetDescriptionsQuery,
  useUpdateDescriptionMutation,
  useDeleteDescriptionMutation,
} = descriptionsApi;
