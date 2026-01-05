'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TotalByDescriptionByYearResponse } from '@/types';

interface AnnualAccountingChartsProps {
  data: TotalByDescriptionByYearResponse;
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7c7c',
  '#8dd1e1',
  '#d084d0',
];

export function AnnualAccountingCharts({ data }: AnnualAccountingChartsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare expense data with "ALTRI" grouping (top 10)
  const allExpenseData = data.totalExpenseByDescriptionList
    .map((item) => ({
      name: item.description,
      value: Math.abs(item.total),
    }))
    .sort((a, b) => b.value - a.value);

  // Prepare income data with "ALTRI" grouping (top 10)
  const allIncomeData = data.totalEarningByDescriptionList
    .map((item) => ({
      name: item.description,
      value: Math.abs(item.total),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
      {/* Expense Charts */}
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-red-600">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <ResponsiveContainer width="100%" height={250} debounce={50}>
            <PieChart>
              <Pie
                data={allExpenseData}
                cx="50%"
                cy="50%"
                outerRadius={125}
                fill="#8884d8"
                dataKey="value"
              >
                {allExpenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Income Charts */}
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-green-600">Income by Category</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <ResponsiveContainer width="100%" height={250} debounce={50}>
            <PieChart>
              <Pie
                data={allIncomeData}
                cx="50%"
                cy="50%"
                outerRadius={125}
                fill="#8884d8"
                dataKey="value"
              >
                {allIncomeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

