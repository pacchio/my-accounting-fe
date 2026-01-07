'use client';

import { useCallback, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DescriptionsResponse, OperationType } from '@/types';
import { DescriptionTable } from './DescriptionTable';

interface DescriptionTabsProps {
  descriptionsResponse: DescriptionsResponse;
  onTypeChange?: (type: OperationType.INCOME | OperationType.EXPENSE) => void;
}

export const DescriptionTabs = ({ descriptionsResponse, onTypeChange }: DescriptionTabsProps) => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');

  // Memoize the callback to prevent recreation on every render
  const handleValueChange = useCallback((value: string) => {
    setActiveTab(value as 'income' | 'expense');
    if (onTypeChange) {
      onTypeChange(value === 'income' ? OperationType.INCOME : OperationType.EXPENSE);
    }
  }, [onTypeChange]);

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={handleValueChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income">Income Categories</TabsTrigger>
          <TabsTrigger value="expense">Expense Categories</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Keep both tables mounted but only display active one to avoid unmount/remount lag */}
      <div>
        {/* Income Table - Always mounted, hidden when expense tab active */}
        <div className={activeTab === 'income' ? 'block' : 'hidden'}>
          {descriptionsResponse.earningDescription.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No income categories yet
            </div>
          ) : (
            <DescriptionTable
              descriptions={descriptionsResponse.earningDescription}
              type={OperationType.INCOME}
            />
          )}
        </div>

        {/* Expense Table - Always mounted, hidden when income tab active */}
        <div className={activeTab === 'expense' ? 'block' : 'hidden'}>
          {descriptionsResponse.expenseDescription.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No expense categories yet
            </div>
          ) : (
            <DescriptionTable
              descriptions={descriptionsResponse.expenseDescription}
              type={OperationType.EXPENSE}
            />
          )}
        </div>
      </div>
    </div>
  );
}

