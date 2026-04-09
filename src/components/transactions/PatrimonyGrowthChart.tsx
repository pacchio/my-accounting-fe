'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { TransactionsByYear } from '@/types';

interface PatrimonyGrowthChartProps {
  data: TransactionsByYear[];
}

type PatrimonyDataPoint = {
  year: string;
  annualProfit: number;
  patrimony: number;
};

export function PatrimonyGrowthChart({ data }: PatrimonyGrowthChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Sort by year ascending and compute cumulative patrimony
  const sortedData = [...data].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const chartData: PatrimonyDataPoint[] = [];
  let cumulative = 0;
  for (const yearData of sortedData) {
    cumulative = Math.round((cumulative + yearData.totalYear) * 100) / 100;
    chartData.push({
      year: yearData.year,
      annualProfit: yearData.totalYear,
      patrimony: cumulative,
    });
  }

  const currentPatrimony = chartData.at(-1)?.patrimony ?? 0;
  const isPositive = currentPatrimony >= 0;
  const lineColor = isPositive ? '#22c55e' : '#ef4444';
  const gradientId = isPositive ? 'patrimonyGradientGreen' : 'patrimonyGradientRed';
  const gradientColor = isPositive ? '#22c55e' : '#ef4444';

  const bestYear = chartData.reduce((max, item) =>
    item.annualProfit > max.annualProfit ? item : max
  );
  const worstYear = chartData.reduce((min, item) =>
    item.annualProfit < min.annualProfit ? item : min
  );

  const totalGrowth =
    chartData.length >= 2
      ? ((currentPatrimony - chartData[0].annualProfit) / Math.abs(chartData[0].annualProfit)) * 100
      : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatCurrency} width={110} />
            <Tooltip
              formatter={(value: number | undefined) => [value !== undefined ? formatCurrency(value) : '', 'Patrimony']}
              labelFormatter={(label) => `Year ${label}`}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload as PatrimonyDataPoint;
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-md text-sm">
                    <p className="font-semibold mb-1">Year {label}</p>
                    <p className="text-muted-foreground">
                      Annual profit:{' '}
                      <span
                        className={d.annualProfit >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}
                      >
                        {formatCurrency(d.annualProfit)}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      Cumulative patrimony:{' '}
                      <span
                        className={d.patrimony >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}
                      >
                        {formatCurrency(d.patrimony)}
                      </span>
                    </p>
                  </div>
                );
              }}
            />
            <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="patrimony"
              stroke={lineColor}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={{ fill: lineColor, r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: lineColor }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Summary Cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Current Patrimony</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(currentPatrimony)}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Growth</p>
            <p className={`text-2xl font-bold ${totalGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {isFinite(totalGrowth) ? `${totalGrowth >= 0 ? '+' : ''}${totalGrowth.toFixed(1)}%` : '—'}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Best Year</p>
            <p className="text-2xl font-bold text-green-600">{bestYear.year}</p>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(bestYear.annualProfit)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Worst Year</p>
            <p className="text-2xl font-bold text-red-600">{worstYear.year}</p>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(worstYear.annualProfit)}</p>
          </div>
        </div>

        {/* Year-by-year breakdown table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium text-muted-foreground">Year</th>
                <th className="py-2 text-right font-medium text-muted-foreground">Annual Profit</th>
                <th className="py-2 text-right font-medium text-muted-foreground">Cumulative Patrimony</th>
                <th className="py-2 text-right font-medium text-muted-foreground">YoY Change</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, index) => {
                const prev = index > 0 ? chartData[index - 1].patrimony : 0;
                const yoyChange = row.patrimony - prev;
                return (
                  <tr key={row.year} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-2 font-medium">{row.year}</td>
                    <td
                      className={`py-2 text-right font-medium ${
                        row.annualProfit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(row.annualProfit)}
                    </td>
                    <td
                      className={`py-2 text-right font-medium ${
                        row.patrimony >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(row.patrimony)}
                    </td>
                    <td
                      className={`py-2 text-right ${
                        yoyChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {index === 0 ? '—' : `${yoyChange >= 0 ? '+' : ''}${formatCurrency(yoyChange)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

