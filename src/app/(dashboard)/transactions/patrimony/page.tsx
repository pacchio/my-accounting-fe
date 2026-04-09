'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useGetAllTransactionsQuery } from '@/store/api/transactionsApi';
import { PatrimonyGrowthChart } from '@/components/transactions/PatrimonyGrowthChart';

export default function PatrimonyPage() {
  const { data, isLoading } = useGetAllTransactionsQuery();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Patrimony Growth</CardTitle>
          <CardDescription>
            Track the cumulative growth of your net worth over the years
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !data || data.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <PatrimonyGrowthChart data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

