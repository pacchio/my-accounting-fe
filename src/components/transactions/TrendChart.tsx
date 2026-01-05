'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TransactionsByYear } from '@/types';

interface TrendChartProps {
  data: TransactionsByYear[];
  chartType: 'PROFIT' | 'INCOME' | 'EXPENSES';
}

export function TrendChart({ data, chartType }: TrendChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Process data for the chart - sort by year first
  const sortedData = [...data].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const chartData = sortedData.map((yearData) => {
    // totalEarningTransactions: positive values
    // totalExpenseTransactions: positive values (absolute)
    // totalYear: profit (can be positive or negative)
    const earnings = yearData.totalEarningTransactions;
    const expenses = Math.abs(yearData.totalExpenseTransactions);
    const profit = yearData.totalYear;

    return {
      year: yearData.year,
      profit: profit,
      income: earnings,
      expenses: expenses,
    };
  });

  const getChartConfig = () => {
    switch (chartType) {
      case 'PROFIT':
        return {
          dataKey: 'profit',
          stroke: '#8b5cf6',
          name: 'Profit',
          fill: '#8b5cf6',
        };
      case 'INCOME':
        return {
          dataKey: 'income',
          stroke: '#22c55e',
          name: 'Income',
          fill: '#22c55e',
        };
      case 'EXPENSES':
        return {
          dataKey: 'expenses',
          stroke: '#ef4444',
          name: 'Expenses',
          fill: '#ef4444',
        };
    }
  };

  const config = getChartConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              tickFormatter={formatCurrency}
              width={100}
            />
            <Tooltip
              formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={config.dataKey}
              stroke={config.stroke}
              strokeWidth={2}
              name={config.name}
              dot={{ fill: config.fill, r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Summary Statistics */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {chartType === 'PROFIT' && (
            <>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Average Profit</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(
                    chartData.reduce((sum, item) => sum + item.profit, 0) /
                      chartData.length
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Best Year
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    chartData.reduce((max, item) =>
                      item.profit > max.profit ? item : max
                    ).year
                  }
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Worst Year</p>
                <p className="text-2xl font-bold text-red-600">
                  {
                    chartData.reduce((min, item) =>
                      item.profit < min.profit ? item : min
                    ).year
                  }
                </p>
              </div>
            </>
          )}
          {chartType === 'INCOME' && (
            <>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Average Income</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    chartData.reduce((sum, item) => sum + item.income, 0) /
                      chartData.length
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Maximum</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    Math.max(...chartData.map((item) => item.income))
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Minimum</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    Math.min(...chartData.map((item) => item.income))
                  )}
                </p>
              </div>
            </>
          )}
          {chartType === 'EXPENSES' && (
            <>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Average Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    chartData.reduce((sum, item) => sum + item.expenses, 0) /
                      chartData.length
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Maximum</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    Math.max(...chartData.map((item) => item.expenses))
                  )}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Minimum</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    Math.min(...chartData.map((item) => item.expenses))
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

