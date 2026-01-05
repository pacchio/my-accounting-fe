'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft } from 'lucide-react';
import { OperationType, Transaction, TransactionsByYear } from '@/types';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { EditTransactionDialog } from './EditTransactionDialog';
import { DeleteTransactionDialog } from './DeleteTransactionDialog';

interface TransactionsListProps {
  data?: TransactionsByYear[];
  isLoading?: boolean;
}

export function TransactionsList({ data: transactionsByYear, isLoading }: TransactionsListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getTransactionIcon = (type: OperationType) => {
    switch (type) {
      case OperationType.INCOME:
        return <ArrowUpCircle className="h-4 w-4 text-green-600" />;
      case OperationType.EXPENSE:
        return <ArrowDownCircle className="h-4 w-4 text-red-600" />;
      case OperationType.WITHDRAWAL:
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTransactionColor = (type: OperationType) => {
    switch (type) {
      case OperationType.INCOME:
        return 'text-green-600';
      case OperationType.EXPENSE:
        return 'text-red-600';
      case OperationType.WITHDRAWAL:
        return 'text-blue-600';
    }
  };

  const getTypeLabel = (type: OperationType) => {
    switch (type) {
      case OperationType.INCOME:
        return 'Income';
      case OperationType.EXPENSE:
        return 'Expense';
      case OperationType.WITHDRAWAL:
        return 'Withdrawal';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted"></div>
          ))}
        </div>
      </Card>
    );
  }

  if (!transactionsByYear || transactionsByYear.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-muted-foreground">
          No transactions found. Add your first transaction!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {transactionsByYear.map((yearData) => (
        <Card key={yearData.year}>
          <Accordion type="multiple" className="w-full">
            {/* Year Header */}
            <AccordionItem value={yearData.year} className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex w-full items-center justify-between pr-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{yearData.year}</h3>
                    <Badge variant="secondary">
                      {yearData.transactionsByMonth.reduce(
                        (sum, month) =>
                          sum +
                          month.earningTransactions.reduce((s, t) => s + t.transactions.length, 0) +
                          month.expenseTransactions.reduce((s, t) => s + t.transactions.length, 0) +
                          month.withdrawals.length,
                        0
                      )}{' '}
                      transazioni
                    </Badge>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Entrate</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(yearData.totalEarningTransactions)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Uscite</p>
                      <p className="font-semibold text-red-600">
                        {formatCurrency(yearData.totalExpenseTransactions)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Totale</p>
                      <p className="text-lg font-bold">{formatCurrency(yearData.totalYear)}</p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                {/* Months */}
                <Accordion type="multiple" className="space-y-2">
                  {yearData.transactionsByMonth.map((monthData) => (
                    <AccordionItem
                      key={`${monthData.year}-${monthData.month}`}
                      value={`${monthData.year}-${monthData.month}`}
                      className="rounded-lg border"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex w-full items-center justify-between pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {format(new Date(Number(monthData.year), Number(monthData.month) - 1), 'MMMM', {
                                locale: it,
                              })}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {monthData.earningTransactions.reduce((s, t) => s + t.transactions.length, 0) +
                                monthData.expenseTransactions.reduce((s, t) => s + t.transactions.length, 0) +
                                monthData.withdrawals.length}
                            </Badge>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="text-green-600">
                              +{formatCurrency(monthData.totalEarningTransactions)}
                            </span>
                            <span className="text-red-600">
                              -{formatCurrency(monthData.totalExpenseTransactions)}
                            </span>
                            <span className="font-semibold">{formatCurrency(monthData.total)}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="space-y-2">
                          {/* Income Transactions */}
                          {monthData.earningTransactions.map((group) => (
                            <div key={group.description} className="space-y-1">
                              <div className="flex items-center justify-between rounded-md bg-green-50 px-3 py-2 dark:bg-green-950/20">
                                <span className="text-sm font-medium">{group.description}</span>
                                <span className="text-sm font-semibold text-green-600">
                                  {formatCurrency(group.total)}
                                </span>
                              </div>
                              {group.transactions.map((transaction) => (
                                <div
                                  key={transaction.id}
                                  className="flex items-center justify-between rounded-md border bg-card px-3 py-2 pl-6"
                                >
                                  <div className="flex items-center gap-3">
                                    {getTransactionIcon(transaction.type)}
                                    <div>
                                      <p className="text-sm font-medium">{transaction.description}</p>
                                      {transaction.additionalNotes && (
                                        <p className="text-xs text-muted-foreground">
                                          {transaction.additionalNotes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <p className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                                        {formatCurrency(transaction.amount)}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(transaction.date), 'dd MMM yyyy', { locale: it })}
                                      </p>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEdit(transaction)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => handleDelete(transaction)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}

                          {/* Expense Transactions */}
                          {monthData.expenseTransactions.map((group) => (
                            <div key={group.description} className="space-y-1">
                              <div className="flex items-center justify-between rounded-md bg-red-50 px-3 py-2 dark:bg-red-950/20">
                                <span className="text-sm font-medium">{group.description}</span>
                                <span className="text-sm font-semibold text-red-600">
                                  {formatCurrency(group.total)}
                                </span>
                              </div>
                              {group.transactions.map((transaction) => (
                                <div
                                  key={transaction.id}
                                  className="flex items-center justify-between rounded-md border bg-card px-3 py-2 pl-6"
                                >
                                  <div className="flex items-center gap-3">
                                    {getTransactionIcon(transaction.type)}
                                    <div>
                                      <p className="text-sm font-medium">{transaction.description}</p>
                                      {transaction.additionalNotes && (
                                        <p className="text-xs text-muted-foreground">
                                          {transaction.additionalNotes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <p className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                                        {formatCurrency(transaction.amount)}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(transaction.date), 'dd MMM yyyy', { locale: it })}
                                      </p>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEdit(transaction)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => handleDelete(transaction)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}

                          {/* Withdrawals */}
                          {monthData.withdrawals.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2 dark:bg-blue-950/20">
                                <span className="text-sm font-medium">Prelievi</span>
                                <span className="text-sm font-semibold text-blue-600">
                                  {formatCurrency(monthData.totalWithdrawals)}
                                </span>
                              </div>
                              {monthData.withdrawals.map((transaction) => (
                                <div
                                  key={transaction.id}
                                  className="flex items-center justify-between rounded-md border bg-card px-3 py-2 pl-6"
                                >
                                  <div className="flex items-center gap-3">
                                    {getTransactionIcon(transaction.type)}
                                    <div>
                                      <p className="text-sm font-medium">
                                        {transaction.billFromWhichWithdraw?.description} →{' '}
                                        {transaction.bill.description}
                                      </p>
                                      {transaction.additionalNotes && (
                                        <p className="text-xs text-muted-foreground">
                                          {transaction.additionalNotes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <p className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                                        {formatCurrency(transaction.amount)}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(transaction.date), 'dd MMM yyyy', { locale: it })}
                                      </p>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEdit(transaction)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => handleDelete(transaction)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}

      <EditTransactionDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        transaction={selectedTransaction}
      />

      <DeleteTransactionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
}
