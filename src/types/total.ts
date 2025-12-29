// Account Balance (Total) Types

export interface Total {
  id: number;
  amount: number;
  description: string;
  canDelete: boolean;
}

export interface TotalUpdateRequest {
  id?: number | null;
  amount: number;
  description: string;
  canDelete: boolean;
}

export interface TotalByDescription {
  description: string;
  total: number;
}

export interface TotalByDescriptionResponse {
  totalEarningByDescriptionList: TotalByDescription[];
  totalExpenseByDescriptionList: TotalByDescription[];
  totalEarning: number;
  totalExpense: number;
}

export interface TotalByDescriptionByYearResponse extends TotalByDescriptionResponse {
  year: string;
}
