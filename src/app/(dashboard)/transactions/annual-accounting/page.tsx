'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useGetTotalsByDescriptionAllQuery } from '@/store/api/totalsApi';
import { AnnualAccountingCharts } from '@/components/transactions/AnnualAccountingCharts';
import { AnnualAccountingTable } from '@/components/transactions/AnnualAccountingTable';

export default function AnnualAccountingPage() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const hasInitialized = useRef(false);

  // Get all years data - single query for everything
  const { data: allYearsData, isLoading } = useGetTotalsByDescriptionAllQuery();

  // Extract available years
  const years = useMemo(
    () => allYearsData?.map((item: { year: string }) => item.year) || [],
    [allYearsData]
  );

  // Find data for selected year
  const currentYearData = useMemo(
    () => allYearsData?.find((item: { year: string }) => item.year === selectedYear),
    [allYearsData, selectedYear]
  );

  // Set initial year when data loads (only once)
  useEffect(() => {
    if (!hasInitialized.current && !selectedYear && years.length > 0) {
      setSelectedYear(years[0]);
      hasInitialized.current = true;
    }
  }, [years, selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Annual Accounting</CardTitle>
          <CardDescription>
            View annual statistics of your transactions by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !allYearsData || allYearsData.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No transactions found
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Year Selector */}
              <div className="flex justify-center">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-50">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year: string) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentYearData ? (
                <>
                  {/* Totals Summary */}
                  <div className="grid gap-4 grid-cols-2">
                    <Card className="gap-2">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          USCITE
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-red-600">
                          {formatCurrency(currentYearData.totalExpense || 0)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="gap-2">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          ENTRATE
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(currentYearData.totalEarning || 0)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts */}
                  <AnnualAccountingCharts key={selectedYear} data={currentYearData} />

                  {/* Table */}
                  <AnnualAccountingTable key={`table-${selectedYear}`} data={currentYearData} />
                </>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Seleziona un anno per visualizzare i dati
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

