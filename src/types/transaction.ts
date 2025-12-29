// Transaction Types

export enum OperationType {
  INCOME = 'ENTRATA',
  EXPENSE = 'USCITA',
  WITHDRAWAL = 'PRELIEVO',
}

export interface AbsoluteTotal {
  id: number;
  amount: number;
  description: string;
  canDelete: boolean;
}

export interface Transaction {
  id: number;
  type: OperationType;
  amount: number;
  description: string | null;
  additionalNotes: string | null;
  date: string;
  bill: Partial<AbsoluteTotal>;
  billFromWhichWithdraw: Partial<AbsoluteTotal> | null;
}

export interface AddTransactionRequest {
  type: OperationType;
  amount: number;
  description?: string | null;
  additionalNotes?: string | null;
  date: Date;
  bill: {
    id: number;
  };
  billFromWhichWithdraw?: {
    id: number;
  } | null;
}

export interface UpdateTransactionRequest extends AddTransactionRequest {
  id: number;
}

export interface DeleteTransactionItem {
  id: number;
  type: OperationType;
  amount: number;
  bill: {
    id: number;
  };
  billFromWhichWithdraw?: {
    id: number;
  } | null;
}

export interface TransactionFilterRequest {
  years?: string[];
  months?: string[];
  types?: string[];
  descriptions?: string[];
  bills?: number[];
}

export interface TransactionByDescription {
  description: string;
  transactions: Transaction[];
  total: number;
}

export interface TransactionByMonth {
  year: string;
  month: string;
  earningTransactions: TransactionByDescription[];
  expenseTransactions: TransactionByDescription[];
  withdrawals: Transaction[];
  totalEarningTransactions: number;
  totalExpenseTransactions: number;
  totalWithdrawals: number;
  total: number;
}

export interface TransactionsByYear {
  year: string;
  transactionsByMonth: TransactionByMonth[];
  totalEarningTransactions: number;
  totalExpenseTransactions: number;
  totalYear: number;
}

export interface PaginatedTransactionsRequest {
  pageIndex: number;
  pageSize: number;
}

export interface PaginatedTransactionsResponse {
  transactions: Transaction[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
