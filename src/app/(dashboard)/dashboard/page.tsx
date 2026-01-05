'use client';

import { useGetDescriptionsQuery } from '@/store/api/descriptionsApi';
import { useState, useMemo, useEffect, useRef } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TransactionsTable, TransactionsTableRef } from '@/components/transactions/TransactionsTable';
import { TransactionFilters, FilterState } from '@/components/transactions/TransactionFilters';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { OperationType } from '@/types';
import {
  useLazyGetAllTransactionsQuery,
  useFilterTransactionsByYearMutation,
  useGetTransactionYearsQuery,
} from '@/store/api/transactionsApi';
import { useGetTotalsQuery } from '@/store/api/totalsApi';

export default function DashboardPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const transactionsTableRef = useRef<TransactionsTableRef>(null);

  const { data: years } = useGetTransactionYearsQuery();
  const { data: descriptionsRes } = useGetDescriptionsQuery(false);
  const { data: accounts } = useGetTotalsQuery();

  // Use lazy query - only fetch when no filters are active
  const [getAllTransactions, { data: allTransactions, isLoading: isLoadingAll }] =
    useLazyGetAllTransactionsQuery();

  const [filterTransactions, { data: filteredTransactions, isLoading: isFiltering }] =
    useFilterTransactionsByYearMutation();


  const descriptions = useMemo(() => {
    return descriptionsRes ? [
      ...descriptionsRes.earningDescription.map((d => d.description)),
      ...descriptionsRes.expenseDescription.map((d) => d.description)
    ] : [];
  }, [descriptionsRes]);

  const handleFilterChange = async (filters: FilterState) => {
    setActiveFilters(filters);

    // If filters are empty, fetch all transactions
    if (Object.keys(filters).length === 0) {
      getAllTransactions();
      return;
    }

    // Apply filters via RTK Query
    await filterTransactions({
      years: filters.years,
      months: filters.months,
      types: filters.types,
      descriptions: filters.descriptions,
      bills: filters.bills,
    });
  };

  // Refetch transactions after add/update/delete
  const handleRefetchTransactions = () => {
    if (activeFilters && Object.keys(activeFilters).length > 0) {
      // Reapply current filters
      filterTransactions({
        years: activeFilters.years || [],
        months: activeFilters.months || [],
        types: activeFilters.types || [],
        descriptions: activeFilters.descriptions || [],
        bills: activeFilters.bills || [],
      });
    } else {
      // Refetch all transactions
      getAllTransactions();
    }
  };

  const handleTransactionAdded = (transaction: { date: Date; description: string | null; type: OperationType }, scrollTo?: boolean) => {
    // Refetch data first
    handleRefetchTransactions();

    if (scrollTo) {
      // Use setTimeout to allow the transaction refetch to complete first
      setTimeout(() => {
        transactionsTableRef.current?.expandAndScrollToTransaction(
          transaction.date,
          transaction.description,
          transaction.type
        );
      }, 500); // Give time for refetch to complete
    }
  };

  return (
    <div className="space-y-4">
      <DashboardHeader />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Transactions</h3>
          <p className="text-xs text-muted-foreground">
            {activeFilters && Object.keys(activeFilters).length > 0
              ? 'Filtered results'
              : 'View and manage your transactions'}
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <TransactionFilters
        onFilterChange={handleFilterChange}
        years={years || []}
        descriptions={descriptions}
        accounts={accounts || []}
      />

      <TransactionsTable
        ref={transactionsTableRef}
        data={filteredTransactions || allTransactions}
        isLoading={isFiltering || isLoadingAll}
        onRefetchTransactions={handleRefetchTransactions}
      />

      <AddTransactionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onTransactionAdded={handleTransactionAdded}
      />
    </div>
  );
}
