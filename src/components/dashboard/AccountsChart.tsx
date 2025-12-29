'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Total } from '@/types';

interface AccountsChartProps {
  totals: Total[];
  totalBalance: number;
}

const COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
  '#6366f1', // indigo
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-sm font-bold text-primary">
          {new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
          }).format(data.actualValue)}
        </p>
      </div>
    );
  }
  return null;
};

export function AccountsChart({ totals, totalBalance }: AccountsChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format total with responsive font size
  const formatTotal = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = formatCurrency(amount);

    // Determine font size based on number magnitude and character length
    const formattedLength = formatted.length;
    let fontSize = 'text-xl'; // Default for small amounts

    if (absAmount >= 1000000 || formattedLength > 12) {
      fontSize = 'text-xs'; // €1M+ or very long (e.g., "€1.234.567")
    } else if (absAmount >= 100000 || formattedLength > 10) {
      fontSize = 'text-xs'; // €100k+ (e.g., "€123.456")
    } else if (absAmount >= 50000 || formattedLength > 8) {
      fontSize = 'text-sm'; // €50k+ (e.g., "€95.433") - Smaller!
    } else if (absAmount >= 10000) {
      fontSize = 'text-base'; // €10k-50k (e.g., "€12.345")
    }

    return { formatted, fontSize };
  };

  const { formatted: totalFormatted, fontSize: totalFontSize } = formatTotal(totalBalance);

  // Prepare data for pie chart - all accounts with actual balances
  const chartData = totals.map((total) => ({
    name: total.description,
    value: Math.abs(total.amount), // Use absolute value for chart visualization
    actualValue: total.amount, // Keep original for tooltip
  }));

  return (
    <Card className="h-50">
      <CardContent className="p-2 h-full">
        <div className="relative w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 100 }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Total Balance in Center - Clean design */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <p className="text-xs text-muted-foreground font-medium">Total</p>
            <p className={`${totalFontSize} font-bold`}>{totalFormatted}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
