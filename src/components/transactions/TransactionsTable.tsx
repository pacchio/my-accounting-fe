'use client';

import React, { useState, useEffect } from 'react';

// Animated collapse - renders content only when needed for performance
const AnimatedCollapse = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateOpen, setAnimateOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure content is rendered before animation starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateOpen(true);
        });
      });
    } else {
      setAnimateOpen(false);
      // Keep content rendered during close animation
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className="grid transition-[grid-template-rows] duration-200 ease-out"
      style={{
        gridTemplateRows: animateOpen ? '1fr' : '0fr',
        willChange: 'grid-template-rows'
      }}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ChevronDown, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Transaction, TransactionsByYear } from '@/types';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { EditTransactionDialog } from './EditTransactionDialog';
import { DeleteTransactionDialog } from './DeleteTransactionDialog';
import { DeleteGroupDialog } from './DeleteGroupDialog';

interface TransactionsTableProps {
  data?: TransactionsByYear[];
  isLoading?: boolean;
}

export function TransactionsTable({ data: transactionsByYear, isLoading }: TransactionsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ transactions: Transaction[]; description: string } | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteGroup = (transactions: Transaction[], description: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroup({ transactions, description });
    setIsDeleteGroupDialogOpen(true);
  };

  const toggleMonth = (monthKey: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  const toggleDescription = (descriptionKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(descriptionKey)) {
      newExpanded.delete(descriptionKey);
    } else {
      newExpanded.add(descriptionKey);
    }
    setExpandedDescriptions(newExpanded);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getMonthName = (monthNum: string) => {
    const date = new Date(2000, parseInt(monthNum) - 1, 1);
    return format(date, 'MMMM').toUpperCase();
  };

  const getMonthNameShort = (monthNum: string) => {
    const date = new Date(2000, parseInt(monthNum) - 1, 1);
    return format(date, 'MMM').toUpperCase();
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
    <div className="space-y-6">
      {transactionsByYear.map((yearData) => (
        <Card key={yearData.year}>
          {/* Year Header */}
          <div className="border-b bg-muted/50 px-6 py-3">
            <h3 className="text-xl font-bold text-primary">{yearData.year}</h3>
          </div>

          {/* Months Table */}
          <Table className="sm:table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-8 sm:w-[2%]"></TableHead>
                <TableHead className="sm:w-[4%]">Month</TableHead>
                <TableHead className="text-right sm:w-[32%]">Expenses</TableHead>
                <TableHead className="text-right sm:w-[27%]">Income</TableHead>
                <TableHead className="text-right font-semibold sm:w-[12%]">Total</TableHead>
                <TableHead className="text-right hidden sm:table-cell sm:w-[23%]">Withdrawals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Year Totals Summary Row */}
              <TableRow className="bg-primary/5 font-semibold border-b-2">
                <TableCell></TableCell>
                <TableCell className="text-primary font-bold"></TableCell>
                <TableCell className="text-right text-primary">
                  {formatCurrency(yearData.totalExpenseTransactions)}
                </TableCell>
                <TableCell className="text-right text-primary">
                  {formatCurrency(yearData.totalEarningTransactions)}
                </TableCell>
                <TableCell className="text-right text-primary font-bold">
                  {formatCurrency(yearData.totalYear)}
                </TableCell>
                <TableCell className="text-right text-primary hidden sm:table-cell"></TableCell>
              </TableRow>

              {/* Month Rows */}
              {yearData.transactionsByMonth.map((monthData) => {
                const monthKey = `${monthData.year}-${monthData.month}`;
                const isExpanded = expandedMonths.has(monthKey);

                return (
                  <React.Fragment key={monthKey}>
                    {/* Month Summary Row */}
                    <TableRow
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleMonth(monthKey)}
                    >
                      <TableCell>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        <span className="hidden sm:inline">{getMonthName(monthData.month)}</span>
                        <span className="sm:hidden">{getMonthNameShort(monthData.month)}</span>
                      </TableCell>
                      <TableCell className="text-right text-red-600 font-medium">
                        {formatCurrency(monthData.totalExpenseTransactions)}
                      </TableCell>
                      <TableCell className="text-right text-green-600 font-medium">
                        {formatCurrency(monthData.totalEarningTransactions)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(monthData.total)}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-medium hidden sm:table-cell">
                        {formatCurrency(monthData.totalWithdrawals)}
                      </TableCell>
                    </TableRow>

                    {/* Expanded Month Details - Animated */}
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={6} className="p-0">
                        <AnimatedCollapse isOpen={isExpanded}>
                          {/* Desktop: Grid layout with fixed percentages matching table */}
                          <div className="hidden sm:grid sm:grid-cols-[2%_4%_32%_27%_12%_23%] py-3">
                            <div></div>
                            <div></div>
                            {/* Expense Column */}
                            <div className="px-2">
                              <div className="space-y-2">
                                {monthData.expenseTransactions.map((group) => {
                                  const descKey = `expense-${monthKey}-${group.description}`;
                                  const isDescExpanded = expandedDescriptions.has(descKey);
                                  return (
                                    <div key={group.description} className="space-y-1.5">
                                      <div
                                        className="flex items-center gap-2 rounded-lg bg-card border border-border/50 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-all shadow-sm"
                                        onClick={(e) => toggleDescription(descKey, e)}
                                      >
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 p-0 hover:bg-muted shrink-0"
                                          onClick={(e) => handleDeleteGroup(group.transactions, group.description, e)}
                                        >
                                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                        <span className="text-sm font-bold text-red-600 dark:text-red-400 whitespace-nowrap shrink-0">
                                          {formatCurrency(group.total)}
                                        </span>
                                        <span className="text-sm font-medium flex-1 truncate min-w-0 text-center">
                                          {group.description}
                                        </span>
                                        {isDescExpanded ? (
                                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                        )}
                                      </div>
                                      <AnimatedCollapse isOpen={isDescExpanded}>
                                        <div className="space-y-1.5 pt-1.5">
                                          {group.transactions.map((transaction) => (
                                            <div
                                              key={transaction.id}
                                              className="flex items-center justify-between rounded-lg bg-muted/30 border border-border/30 px-3 py-2 ml-4"
                                            >
                                              <div className="flex items-center gap-1.5 text-xs min-w-0 flex-1">
                                                <span className="font-medium text-muted-foreground whitespace-nowrap">
                                                  {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
                                                </span>
                                                <span className="text-muted-foreground">•</span>
                                                <span className="text-muted-foreground truncate">
                                                  {transaction.bill.description}
                                                </span>
                                                {transaction.additionalNotes && (
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs">
                                                      {transaction.additionalNotes}
                                                    </TooltipContent>
                                                  </Tooltip>
                                                )}
                                              </div>
                                              <div className="flex items-center gap-2 ml-2">
                                                <span className="text-xs font-bold text-red-600 dark:text-red-400 whitespace-nowrap">
                                                  {formatCurrency(transaction.amount)}
                                                </span>
                                                <div className="flex gap-0.5">
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleEdit(transaction);
                                                    }}
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDelete(transaction);
                                                    }}
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </AnimatedCollapse>
                                    </div>
                                  );
                                })}
                                {monthData.expenseTransactions.length === 0 && (
                                  <p className="text-xs text-muted-foreground text-center py-4">
                                    No expenses
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Income Column */}
                            <div className="px-2">
                              <div className="space-y-2">
                                {monthData.earningTransactions.map((group) => {
                                  const descKey = `income-${monthKey}-${group.description}`;
                                  const isDescExpanded = expandedDescriptions.has(descKey);
                                  return (
                                    <div key={group.description} className="space-y-1.5">
                                      <div
                                        className="flex items-center gap-2 rounded-lg bg-card border border-border/50 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-all shadow-sm"
                                        onClick={(e) => toggleDescription(descKey, e)}
                                      >
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 p-0 hover:bg-muted shrink-0"
                                          onClick={(e) => handleDeleteGroup(group.transactions, group.description, e)}
                                        >
                                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                        <span className="text-sm font-bold text-green-600 dark:text-green-400 whitespace-nowrap shrink-0">
                                          {formatCurrency(group.total)}
                                        </span>
                                        <span className="text-sm font-medium flex-1 truncate min-w-0 text-center">
                                          {group.description}
                                        </span>
                                        {isDescExpanded ? (
                                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                        )}
                                      </div>
                                      <AnimatedCollapse isOpen={isDescExpanded}>
                                        <div className="space-y-1.5 pt-1.5">
                                          {group.transactions.map((transaction) => (
                                            <div
                                              key={transaction.id}
                                              className="flex items-center justify-between rounded-lg bg-muted/30 border border-border/30 px-3 py-2 ml-4"
                                            >
                                              <div className="flex items-center gap-1.5 text-xs min-w-0 flex-1">
                                                <span className="font-medium text-muted-foreground whitespace-nowrap">
                                                  {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
                                                </span>
                                                <span className="text-muted-foreground">•</span>
                                                <span className="text-muted-foreground truncate">
                                                  {transaction.bill.description}
                                                </span>
                                                {transaction.additionalNotes && (
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs">
                                                      {transaction.additionalNotes}
                                                    </TooltipContent>
                                                  </Tooltip>
                                                )}
                                              </div>
                                              <div className="flex items-center gap-2 ml-2">
                                                <span className="text-xs font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                                                  {formatCurrency(transaction.amount)}
                                                </span>
                                                <div className="flex gap-0.5">
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleEdit(transaction);
                                                    }}
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDelete(transaction);
                                                    }}
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </AnimatedCollapse>
                                    </div>
                                  );
                                })}
                                {monthData.earningTransactions.length === 0 && (
                                  <p className="text-xs text-muted-foreground text-center py-4">
                                    No income
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Total Column - Empty */}
                            <div></div>

                            {/* Withdrawal Column */}
                            <div className="px-2">
                              <div className="space-y-2">
                                {monthData.withdrawals.length > 0 && (
                                  <div className="space-y-2">
                                    {monthData.withdrawals.map((transaction) => (
                                      <div
                                        key={transaction.id}
                                        className="flex items-center justify-between rounded-lg bg-card border border-border/50 px-3 py-2 shadow-sm"
                                      >
                                        <div className="flex flex-col gap-0.5">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                              {formatCurrency(transaction.amount)}
                                            </span>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                              {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <span className="font-medium">{transaction.billFromWhichWithdraw?.description}</span>
                                            <span>→</span>
                                            <span className="font-medium">{transaction.bill?.description}</span>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(transaction);
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {monthData.withdrawals.length === 0 && (
                                  <p className="text-xs text-muted-foreground text-center py-4">
                                    No withdrawals
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Mobile: Stacked vertical layout */}
                          <div className="sm:hidden py-3 px-4 space-y-4">
                            {/* Expenses Section */}
                            <div>
                              <h4 className="text-xs font-semibold text-red-600 uppercase mb-2">Expenses</h4>
                              <div className="space-y-2">
                                {monthData.expenseTransactions.map((group) => {
                                  const descKey = `expense-mobile-${monthKey}-${group.description}`;
                                  const isDescExpanded = expandedDescriptions.has(descKey);
                                  return (
                                    <div key={group.description} className="space-y-1.5">
                                      <div
                                        className="flex items-center gap-2 rounded-lg bg-card border border-border/50 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-all shadow-sm"
                                        onClick={(e) => toggleDescription(descKey, e)}
                                      >
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 p-0 hover:bg-muted shrink-0"
                                          onClick={(e) => handleDeleteGroup(group.transactions, group.description, e)}
                                        >
                                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                        <span className="text-sm font-bold text-red-600 dark:text-red-400 whitespace-nowrap shrink-0">
                                          {formatCurrency(group.total)}
                                        </span>
                                        <span className="text-sm font-medium flex-1 truncate min-w-0 text-center">
                                          {group.description}
                                        </span>
                                        {isDescExpanded ? (
                                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                        )}
                                      </div>
                                      <AnimatedCollapse isOpen={isDescExpanded}>
                                        <div className="space-y-1.5 pt-1.5">
                                          {group.transactions.map((transaction) => (
                                            <div
                                              key={transaction.id}
                                              className="flex items-center justify-between rounded-lg bg-muted/30 border border-border/30 px-3 py-2 ml-4"
                                            >
                                              <div className="flex items-center gap-1.5 text-xs min-w-0 flex-1">
                                                <span className="font-medium text-muted-foreground whitespace-nowrap">
                                                  {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
                                                </span>
                                                <span className="text-muted-foreground">•</span>
                                                <span className="text-muted-foreground truncate">
                                                  {transaction.bill.description}
                                                </span>
                                                {transaction.additionalNotes && (
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs">
                                                      {transaction.additionalNotes}
                                                    </TooltipContent>
                                                  </Tooltip>
                                                )}
                                              </div>
                                              <div className="flex items-center gap-2 ml-2">
                                                <span className="text-xs font-bold text-red-600 dark:text-red-400 whitespace-nowrap">
                                                  {formatCurrency(transaction.amount)}
                                                </span>
                                                <div className="flex gap-0.5">
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleEdit(transaction);
                                                    }}
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDelete(transaction);
                                                    }}
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </AnimatedCollapse>
                                    </div>
                                  );
                                })}
                                {monthData.expenseTransactions.length === 0 && (
                                  <p className="text-xs text-muted-foreground text-center py-2">No expenses</p>
                                )}
                              </div>
                            </div>

                            {/* Income Section */}
                            <div>
                              <h4 className="text-xs font-semibold text-green-600 uppercase mb-2">Income</h4>
                              <div className="space-y-2">
                                {monthData.earningTransactions.map((group) => {
                                  const descKey = `income-mobile-${monthKey}-${group.description}`;
                                  const isDescExpanded = expandedDescriptions.has(descKey);
                                  return (
                                    <div key={group.description} className="space-y-1.5">
                                      <div
                                        className="flex items-center gap-2 rounded-lg bg-card border border-border/50 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-all shadow-sm"
                                        onClick={(e) => toggleDescription(descKey, e)}
                                      >
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 p-0 hover:bg-muted shrink-0"
                                          onClick={(e) => handleDeleteGroup(group.transactions, group.description, e)}
                                        >
                                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                        <span className="text-sm font-bold text-green-600 dark:text-green-400 whitespace-nowrap shrink-0">
                                          {formatCurrency(group.total)}
                                        </span>
                                        <span className="text-sm font-medium flex-1 truncate min-w-0 text-center">
                                          {group.description}
                                        </span>
                                        {isDescExpanded ? (
                                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                        )}
                                      </div>
                                      <AnimatedCollapse isOpen={isDescExpanded}>
                                        <div className="space-y-1.5 pt-1.5">
                                          {group.transactions.map((transaction) => (
                                            <div
                                              key={transaction.id}
                                              className="flex items-center justify-between rounded-lg bg-muted/30 border border-border/30 px-3 py-2 ml-4"
                                            >
                                              <div className="flex items-center gap-1.5 text-xs min-w-0 flex-1">
                                                <span className="font-medium text-muted-foreground whitespace-nowrap">
                                                  {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
                                                </span>
                                                <span className="text-muted-foreground">•</span>
                                                <span className="text-muted-foreground truncate">
                                                  {transaction.bill.description}
                                                </span>
                                                {transaction.additionalNotes && (
                                                  <Tooltip>
                                                    <TooltipTrigger asChild>
                                                      <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs">
                                                      {transaction.additionalNotes}
                                                    </TooltipContent>
                                                  </Tooltip>
                                                )}
                                              </div>
                                              <div className="flex items-center gap-2 ml-2">
                                                <span className="text-xs font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                                                  {formatCurrency(transaction.amount)}
                                                </span>
                                                <div className="flex gap-0.5">
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleEdit(transaction);
                                                    }}
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDelete(transaction);
                                                    }}
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </AnimatedCollapse>
                                    </div>
                                  );
                                })}
                                {monthData.earningTransactions.length === 0 && (
                                  <p className="text-xs text-muted-foreground text-center py-2">No income</p>
                                )}
                              </div>
                            </div>

                            {/* Withdrawals Section */}
                            <div>
                              <h4 className="text-xs font-semibold text-blue-600 uppercase mb-2">Withdrawals</h4>
                              <div className="space-y-2">
                                {monthData.withdrawals.map((transaction) => (
                                  <div
                                    key={transaction.id}
                                    className="flex items-center justify-between rounded-lg bg-card border border-border/50 px-3 py-2 shadow-sm"
                                  >
                                    <div className="flex flex-col gap-0.5">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                          {formatCurrency(transaction.amount)}
                                        </span>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                          {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <span className="font-medium">{transaction.billFromWhichWithdraw?.description}</span>
                                        <span>→</span>
                                        <span className="font-medium">{transaction.bill?.description}</span>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(transaction);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                {monthData.withdrawals.length === 0 && (
                                  <p className="text-xs text-muted-foreground text-center py-2">No withdrawals</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AnimatedCollapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
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

      <DeleteGroupDialog
        open={isDeleteGroupDialogOpen}
        onOpenChange={setIsDeleteGroupDialogOpen}
        transactions={selectedGroup?.transactions || []}
        description={selectedGroup?.description || ''}
      />
    </div>
  );
}
