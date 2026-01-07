'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DescriptionsResponse, OperationType } from '@/types';
import { DescriptionTable } from './DescriptionTable';

interface DescriptionTabsProps {
  descriptionsResponse: DescriptionsResponse;
  onTypeChange?: (type: OperationType.INCOME | OperationType.EXPENSE) => void;
}

export function DescriptionTabs({ descriptionsResponse, onTypeChange }: DescriptionTabsProps) {
  return (
    <Tabs defaultValue="income" onValueChange={(value) => {
      if (onTypeChange) {
        onTypeChange(value === 'income' ? OperationType.INCOME : OperationType.EXPENSE);
      }
    }}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="income">Income Categories</TabsTrigger>
        <TabsTrigger value="expense">Expense Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="income" className="space-y-4">
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
      </TabsContent>

      <TabsContent value="expense" className="space-y-4">
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
      </TabsContent>
    </Tabs>
  );
}

