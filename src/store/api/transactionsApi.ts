import { apiSlice } from './apiSlice';
import type {
  Transaction,
  TransactionsByYear,
  AddTransactionRequest,
  UpdateTransactionRequest,
  DeleteTransactionItem,
  TransactionFilterRequest,
  PaginatedTransactionsRequest,
  PaginatedTransactionsResponse,
  TransactionByMonth,
} from '@/types';

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all transactions grouped by year/month
    getAllTransactions: builder.query<TransactionsByYear[], void>({
      query: () => '/transaction/list-by-year-all',
      providesTags: ['Transactions'],
    }),

    // Get years with transactions
    getTransactionYears: builder.query<string[], void>({
      query: () => '/transaction/years',
      providesTags: ['Transactions'],
    }),

    // Get paginated transaction list
    getTransactionList: builder.query<PaginatedTransactionsResponse, PaginatedTransactionsRequest>({
      query: ({ pageIndex, pageSize }) =>
        `/transaction/list?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      providesTags: ['Transactions'],
    }),

    // Get transaction by ID
    getTransactionById: builder.query<Transaction, number>({
      query: (id) => `/transaction/${id}`,
      providesTags: (result, error, id) => [{ type: 'Transactions', id }],
    }),

    // Add new transaction
    addTransaction: builder.mutation<Transaction, AddTransactionRequest>({
      query: (transaction) => ({
        url: '/transaction/add',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),

    // Update transaction
    updateTransaction: builder.mutation<Transaction, UpdateTransactionRequest>({
      query: (transaction) => ({
        url: '/transaction/update',
        method: 'PUT',
        body: transaction,
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),

    // Delete transaction
    deleteTransaction: builder.mutation<void, number>({
      query: (id) => ({
        url: `/transaction/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),

    // Batch delete transactions
    deleteTransactionList: builder.mutation<void, DeleteTransactionItem[]>({
      query: (transactions) => ({
        url: '/transaction/delete-transaction-list',
        method: 'POST',
        body: transactions,
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),

    // Filter transactions by year
    filterTransactionsByYear: builder.mutation<TransactionsByYear[], TransactionFilterRequest>({
      query: (filters) => ({
        url: '/transaction/list-by-year',
        method: 'POST',
        body: filters,
      }),
    }),

    // Filter transactions by month
    filterTransactionsByMonth: builder.mutation<TransactionByMonth[], TransactionFilterRequest>({
      query: (filters) => ({
        url: '/transaction/list-by-month',
        method: 'POST',
        body: filters,
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useLazyGetAllTransactionsQuery,
  useGetTransactionYearsQuery,
  useGetTransactionListQuery,
  useGetTransactionByIdQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useDeleteTransactionListMutation,
  useFilterTransactionsByYearMutation,
  useFilterTransactionsByMonthMutation,
} = transactionsApi;
