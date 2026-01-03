import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '@/types';

interface TransactionListState {
  transactions: Transaction[];
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}

const initialState: TransactionListState = {
  transactions: [],
  totalCount: 0,
  currentPage: 0,
  hasMore: true,
};

const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState,
  reducers: {
    addTransactions: (
      state,
      action: PayloadAction<{ transactions: Transaction[]; totalCount: number }>
    ) => {
      // Avoid duplicates by checking IDs
      const existingIds = new Set(state.transactions.map((t) => t.id));
      const newTransactions = action.payload.transactions.filter(
        (t) => !existingIds.has(t.id)
      );

      state.transactions = [...state.transactions, ...newTransactions];
      state.totalCount = action.payload.totalCount;
      state.hasMore = state.transactions.length < action.payload.totalCount;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    resetTransactionList: (state) => {
      state.transactions = [];
      state.totalCount = 0;
      state.currentPage = 0;
      state.hasMore = true;
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      state.totalCount = Math.max(0, state.totalCount - 1);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const {
  addTransactions,
  incrementPage,
  resetTransactionList,
  removeTransaction,
  updateTransaction,
} = transactionListSlice.actions;

export default transactionListSlice.reducer;

