'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MultiSelect, MultiSelectOption } from '@/components/ui/multi-select';
import { Filter, X } from 'lucide-react';
import { OperationType, Total } from '@/types';

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  years: string[];
  descriptions: string[];
  accounts: Total[];
}

export interface FilterState {
  years?: string[];
  months?: string[];
  types?: string[];
  descriptions?: string[];
  bills?: number[];
}

const MONTHS: MultiSelectOption[] = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const TRANSACTION_TYPES: MultiSelectOption[] = [
  { value: OperationType.INCOME, label: 'Income' },
  { value: OperationType.EXPENSE, label: 'Expenses' },
  { value: OperationType.WITHDRAWAL, label: 'Withdrawals' },
];

export function TransactionFilters({
  onFilterChange,
  years,
  descriptions,
  accounts,
}: TransactionFiltersProps) {
  const currentYear = new Date().getFullYear().toString();

  // Initialize filters with current year as default
  const [filters, setFilters] = useState<FilterState>({
    years: [currentYear],
  });
  const [isExpanded, setIsExpanded] = useState(false);

  // Apply filters on mount with default year
  useEffect(() => {
    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value && value.length > 0 ? value : undefined,
    };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const resetFilters = { years: [currentYear] };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Prepare options for multi-selects
  const yearOptions: MultiSelectOption[] = years.map((year) => ({
    value: year,
    label: year,
  }));

  const descriptionOptions: MultiSelectOption[] = descriptions.map((desc) => ({
    value: desc,
    label: desc,
  }));

  const accountOptions: MultiSelectOption[] = accounts.map((account) => ({
    value: account.id.toString(),
    label: account.description,
  }));

  // Check if filters are different from default (current year only)
  const hasNonDefaultFilters =
    (filters.years && filters.years.length !== 1) ||
    (filters.years && filters.years[0] !== currentYear) ||
    filters.months ||
    filters.types ||
    filters.descriptions ||
    filters.bills;

  // Count active filters (including default year for display)
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.years && filters.years.length > 0) count++;
    if (filters.months && filters.months.length > 0) count++;
    if (filters.types && filters.types.length > 0) count++;
    if (filters.descriptions && filters.descriptions.length > 0) count++;
    if (filters.bills && filters.bills.length > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Always show active filters when collapsed (including default year)
  const shouldShowActiveFilters = !isExpanded && (filters.years || filters.months || filters.types || filters.descriptions || filters.bills);

  // Get label for a filter value
  const getLabel = (key: keyof FilterState, value: string): string => {
    switch (key) {
      case 'months':
        return MONTHS.find((m) => m.value === value)?.label || value;
      case 'types':
        return TRANSACTION_TYPES.find((t) => t.value === value)?.label || value;
      case 'bills':
        return accounts.find((a) => a.id.toString() === value)?.description || value;
      default:
        return value;
    }
  };

  return (
    <Card className="px-3 py-2">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              <h3 className="text-sm font-semibold">Filters</h3>
            </div>
            {/* Show active filters inline */}
            {!isExpanded && shouldShowActiveFilters && (
              <>
                {filters.years && filters.years.map((year) => (
                  <Badge key={year} variant="outline" className="text-xs h-5">
                    Year: {year}
                  </Badge>
                ))}
                {filters.months && filters.months.map((month) => (
                  <Badge key={month} variant="outline" className="text-xs h-5">
                    {getLabel('months', month)}
                  </Badge>
                ))}
                {filters.types && filters.types.map((type) => (
                  <Badge key={type} variant="outline" className="text-xs h-5">
                    {getLabel('types', type)}
                  </Badge>
                ))}
                {filters.descriptions && filters.descriptions.slice(0, 2).map((desc) => (
                  <Badge key={desc} variant="outline" className="text-xs h-5">
                    {desc}
                  </Badge>
                ))}
                {filters.descriptions && filters.descriptions.length > 2 && (
                  <Badge variant="outline" className="text-xs h-5">
                    +{filters.descriptions.length - 2} more
                  </Badge>
                )}
                {filters.bills && filters.bills.slice(0, 1).map((bill) => (
                  <Badge key={bill} variant="outline" className="text-xs h-5">
                    {getLabel('bills', bill.toString())}
                  </Badge>
                ))}
                {filters.bills && filters.bills.length > 1 && (
                  <Badge variant="outline" className="text-xs h-5">
                    +{filters.bills.length - 1} accounts
                  </Badge>
                )}
              </>
            )}
          </div>
          <div className="flex gap-1">
            {hasNonDefaultFilters && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearFilters}>
                <X className="mr-1 h-3 w-3" />
                Reset
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>

        {/* Filter Options - Animated */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-3 pt-2">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Years */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Years</label>
                <MultiSelect
                  options={yearOptions}
                  selected={filters.years || []}
                  onChange={(selected) => updateFilter('years', selected)}
                  placeholder="All years"
                />
              </div>

              {/* Months */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Months</label>
                <MultiSelect
                  options={MONTHS}
                  selected={filters.months || []}
                  onChange={(selected) => updateFilter('months', selected)}
                  placeholder="All months"
                />
              </div>

              {/* Transaction Types */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Type</label>
                <MultiSelect
                  options={TRANSACTION_TYPES}
                  selected={filters.types || []}
                  onChange={(selected) => updateFilter('types', selected)}
                  placeholder="All types"
                />
              </div>

              {/* Wallets/Accounts */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Accounts</label>
                <MultiSelect
                  options={accountOptions}
                  selected={filters.bills?.map((b) => b.toString()) || []}
                  onChange={(selected) =>
                    updateFilter('bills', selected.map((s) => parseInt(s, 10)))
                  }
                  placeholder="All accounts"
                />
              </div>

              {/* Descriptions */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Categories</label>
                <MultiSelect
                  options={descriptionOptions}
                  selected={filters.descriptions || []}
                  onChange={(selected) => updateFilter('descriptions', selected)}
                  placeholder="All categories"
                />
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={clearFilters}>
                <X className="mr-1 h-3 w-3" />
                Reset
              </Button>
              <Button size="sm" className="h-8 text-xs" onClick={applyFilters}>
                <Filter className="mr-1 h-3 w-3" />
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
