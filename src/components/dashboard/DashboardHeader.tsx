'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetTotalsQuery } from '@/store/api/totalsApi';
import { UpdateTotalsDialog } from './UpdateTotalsDialog';
import { AccountsChart } from './AccountsChart';
import { Wallet, Settings as SettingsIcon } from 'lucide-react';

export function DashboardHeader() {
  const { data: totals, isLoading } = useGetTotalsQuery();
  const [isUpdateTotalsOpen, setIsUpdateTotalsOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const totalBalance = totals?.reduce((sum, total) => sum + total.amount, 0) || 0;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 animate-pulse rounded bg-muted"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <Button variant="outline" size="sm" onClick={() => setIsUpdateTotalsOpen(true)}>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Manage Accounts
        </Button>
      </div>

      {/* Account Balances - Chart + Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3">
        {/* Pie Chart - Left Side */}
        <AccountsChart totals={totals || []} totalBalance={totalBalance} />

        {/* Account Cards Grid - Right Side */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 content-start">
          {/* Individual Account Cards - Ultra Compact */}
          {totals?.map((total) => (
            <Card key={total.id} className="sm:h-19 py-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-1.5 sm:p-2 px-4 sm:px-4 h-full flex items-center">
                <div className="space-y-0 w-full">
                  <p className="text-xs text-muted-foreground truncate leading-tight">
                    {total.description}
                  </p>
                  <p className="text-sm font-bold truncate leading-tight">
                    {formatCurrency(total.amount)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <UpdateTotalsDialog open={isUpdateTotalsOpen} onOpenChange={setIsUpdateTotalsOpen} />
    </div>
  );
}
