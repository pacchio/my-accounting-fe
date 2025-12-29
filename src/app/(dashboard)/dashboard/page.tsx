'use client';

import { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { TransactionFilters, FilterState } from '@/components/transactions/TransactionFilters';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  useGetAllTransactionsQuery,
  useFilterTransactionsByYearMutation,
} from '@/store/api/transactionsApi';
import { useGetTotalsQuery } from '@/store/api/totalsApi';

export default function DashboardPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const { data: allTransactions } = useGetAllTransactionsQuery();
  const { data: accounts } = useGetTotalsQuery();
  const [filterTransactions, { data: filteredTransactions, isLoading: isFiltering }] =
    useFilterTransactionsByYearMutation();

  // Extract unique years and descriptions from all transactions
  const { availableYears, availableDescriptions } = useMemo(() => {
    if (!allTransactions) {
      return { availableYears: [], availableDescriptions: [] };
    }

    const years = allTransactions.map((y) => y.year);
    const descriptionsSet = new Set<string>();

    allTransactions.forEach((year) => {
      year.transactionsByMonth.forEach((month) => {
        month.earningTransactions.forEach((group) => {
          if (group.description) descriptionsSet.add(group.description);
        });
        month.expenseTransactions.forEach((group) => {
          if (group.description) descriptionsSet.add(group.description);
        });
      });
    });

    return {
      availableYears: years,
      availableDescriptions: Array.from(descriptionsSet).sort(),
    };
  }, [allTransactions]);

  const handleFilterChange = async (filters: FilterState) => {
    setActiveFilters(filters);

    // If filters are empty, show all transactions
    if (Object.keys(filters).length === 0) {
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
        years={availableYears}
        descriptions={availableDescriptions}
        accounts={accounts || []}
      />

      <TransactionsTable
        data={filteredTransactions || allTransactions}
        isLoading={isFiltering}
      />

      <AddTransactionDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}
