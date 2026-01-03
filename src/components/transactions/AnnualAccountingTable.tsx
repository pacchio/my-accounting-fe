'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TotalByDescriptionByYearResponse } from '@/types';

interface AnnualAccountingTableProps {
  data: TotalByDescriptionByYearResponse;
}

export function AnnualAccountingTable({ data }: AnnualAccountingTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Helper to determine text size based on description length
  const getTextSize = (text: string) => {
    if (text.length > 20) return 'text-xs';
    if (text.length > 10) return 'text-sm';
    return 'text-sm';
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Expenses Table */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <CardTitle className="text-red-600 text-sm sm:text-base">Dettaglio Uscite</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="h-9 px-2 sm:px-4 text-xs sm:text-sm">Categoria</TableHead>
                  <TableHead className="h-9 px-2 sm:px-4 text-right text-xs sm:text-sm w-20 sm:w-28">Totale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.totalExpenseByDescriptionList.map((item, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className={`py-1.5 px-2 sm:px-4 font-medium ${getTextSize(item.description)} wrap-break-word leading-tight max-w-0`}>
                      {item.description}
                    </TableCell>
                    <TableCell className="py-1.5 px-2 sm:px-4 text-right text-red-600 text-xs sm:text-sm font-semibold whitespace-nowrap align-top">
                      {formatCurrency(Math.abs(item.total))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell className="py-2 px-2 sm:px-4 text-xs sm:text-sm">Totale Uscite</TableCell>
                  <TableCell className="py-2 px-2 sm:px-4 text-right text-red-600 text-xs sm:text-base whitespace-nowrap font-bold">
                    {formatCurrency(Math.abs(data.totalExpense))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Income Table */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <CardTitle className="text-green-600 text-sm sm:text-base">Dettaglio Entrate</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="h-9 px-2 sm:px-4 text-xs sm:text-sm">Categoria</TableHead>
                  <TableHead className="h-9 px-2 sm:px-4 text-right text-xs sm:text-sm w-20 sm:w-28">Totale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.totalEarningByDescriptionList.map((item, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className={`py-1.5 px-2 sm:px-4 font-medium ${getTextSize(item.description)} wrap-break-word leading-tight max-w-0`}>
                      {item.description}
                    </TableCell>
                    <TableCell className="py-1.5 px-2 sm:px-4 text-right text-green-600 text-xs sm:text-sm font-semibold whitespace-nowrap align-top">
                      {formatCurrency(Math.abs(item.total))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell className="py-2 px-2 sm:px-4 text-xs sm:text-sm">Totale Entrate</TableCell>
                  <TableCell className="py-2 px-2 sm:px-4 text-right text-green-600 text-xs sm:text-base whitespace-nowrap font-bold">
                    {formatCurrency(Math.abs(data.totalEarning))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

