'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useGetAllTransactionsQuery } from '@/store/api/transactionsApi';
import { TrendChart } from '@/components/transactions/TrendChart';

type ChartType = 'GUADAGNI' | 'ENTRATE' | 'USCITE';

const chartTypes: { value: ChartType; label: string }[] = [
  { value: 'GUADAGNI', label: 'Guadagni' },
  { value: 'ENTRATE', label: 'Entrate' },
  { value: 'USCITE', label: 'Uscite' },
];

export default function TrendPage() {
  const [chartType, setChartType] = useState<ChartType>('GUADAGNI');

  const { data, isLoading } = useGetAllTransactionsQuery();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Andamento</CardTitle>
          <CardDescription>
            Visualizza l&apos;andamento delle transazioni nel tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !data || data.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                Non è presente alcuna transazione
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Chart Type Selector */}
              <div className="flex justify-center">
                <Select
                  value={chartType}
                  onValueChange={(value) => setChartType(value as ChartType)}
                >
                  <SelectTrigger className="w-50">
                    <SelectValue placeholder="Seleziona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {chartTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chart */}
              <TrendChart data={data} chartType={chartType} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

