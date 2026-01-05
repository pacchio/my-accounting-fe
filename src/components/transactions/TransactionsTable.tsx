'use client';

import React, { useState, useCallback, memo, useImperativeHandle, forwardRef } from 'react';

// Animated collapse - pure CSS animation without setState in effects
const AnimatedCollapse = memo(({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
});
AnimatedCollapse.displayName = 'AnimatedCollapse';

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
import { Transaction, TransactionsByYear, OperationType } from '@/types';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { EditTransactionDialog } from './EditTransactionDialog';
import { DeleteTransactionDialog } from './DeleteTransactionDialog';
import { DeleteGroupDialog } from './DeleteGroupDialog';

// Memoized transaction item to prevent re-renders
interface TransactionItemProps {
  transaction: Transaction;
  colorClass: string;
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
  formatCurrency: (amount: number) => string;
}

const TransactionItem = memo(({ transaction, colorClass, onEdit, onDelete, formatCurrency }: TransactionItemProps) => (
  <div className="flex items-center justify-between rounded-lg bg-muted/30 border border-border/30 px-3 py-2 ml-2">
    <div className="flex flex-col lg:flex-row lg:items-center gap-0.5 lg:gap-1.5 text-xs min-w-0 flex-1">
      <span className="font-medium text-muted-foreground whitespace-nowrap">
        {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
      </span>
      <span className={`text-xs font-bold ${colorClass} whitespace-nowrap lg:hidden`}>
        {formatCurrency(transaction.amount)}
      </span>
      <span className="text-muted-foreground hidden lg:inline">•</span>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground truncate">
          {transaction.bill.description}
        </span>
        {transaction.additionalNotes && (
          <Tooltip>
            <TooltipTrigger>
              <button
                type="button"
                className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help shrink-0 touch-manipulation"
                onClick={(e) => e.stopPropagation()}
              >
                <Info className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              {transaction.additionalNotes}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 ml-2">
      <span className={`text-xs font-bold ${colorClass} whitespace-nowrap hidden lg:inline`}>
        {formatCurrency(transaction.amount)}
      </span>
      <div className="flex gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(transaction);
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
            onDelete(transaction);
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  </div>
));
TransactionItem.displayName = 'TransactionItem';

// Memoized transaction group component
interface TransactionGroupProps {
  group: { transactions: Transaction[]; description: string; total: number };
  descKey: string;
  isExpanded: boolean;
  colorClass: string;
  onToggle: (key: string, e: React.MouseEvent) => void;
  onDeleteGroup: (transactions: Transaction[], description: string, e: React.MouseEvent) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
  formatCurrency: (amount: number) => string;
}

const TransactionGroup = memo(({
  group, descKey, isExpanded, colorClass, onToggle, onDeleteGroup, onEdit, onDelete, formatCurrency
}: TransactionGroupProps) => (
  <div id={`desc-${descKey}`} className="space-y-1.5">
    <div
      className="flex items-center gap-2 rounded-lg bg-card border border-border/50 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-all shadow-sm"
      onClick={(e) => onToggle(descKey, e)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 p-0 hover:bg-muted shrink-0"
        onClick={(e) => onDeleteGroup(group.transactions, group.description, e)}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </Button>
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 flex-1 min-w-0">
        <span className={`text-sm font-bold ${colorClass} whitespace-nowrap shrink-0`}>
          {formatCurrency(group.total)}
        </span>
        <span className="text-xs lg:text-sm font-medium lg:flex-1 truncate min-w-0 lg:text-center">
          {group.description}
        </span>
      </div>
      {isExpanded ? (
        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      )}
    </div>
    <AnimatedCollapse isOpen={isExpanded}>
      <div className="space-y-1.5 pt-1.5">
        {group.transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            colorClass={colorClass}
            onEdit={onEdit}
            onDelete={onDelete}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </AnimatedCollapse>
  </div>
));
TransactionGroup.displayName = 'TransactionGroup';

// Memoized withdrawal item
interface WithdrawalItemProps {
  transaction: Transaction;
  onDelete: (t: Transaction) => void;
  formatCurrency: (amount: number) => string;
}

const WithdrawalItem = memo(({ transaction, onDelete, formatCurrency }: WithdrawalItemProps) => (
  <div className="flex items-center justify-between rounded-lg bg-card border border-border/50 px-3 py-2 shadow-sm">
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-col md:flex-col lg:flex-row lg:items-center lg:gap-2">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {format(new Date(transaction.date), 'EEE dd/MM', { locale: enUS })}
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {formatCurrency(transaction.amount)}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground break-words">
        <span className="font-medium break-words">{transaction.billFromWhichWithdraw?.description}</span>
        <span>→</span>
        <span className="font-medium break-words">{transaction.bill?.description}</span>
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-muted-foreground hover:text-destructive"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(transaction);
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
));
WithdrawalItem.displayName = 'WithdrawalItem';

interface TransactionsTableProps {
  data?: TransactionsByYear[];
  isLoading?: boolean;
  onRefetchTransactions?: () => void;
}

export interface TransactionsTableRef {
  expandAndScrollToTransaction: (date: Date, description: string | null, type: OperationType) => void;
}

export const TransactionsTable = forwardRef<TransactionsTableRef, TransactionsTableProps>(
  function TransactionsTable({ data: transactionsByYear, isLoading, onRefetchTransactions }, ref) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ transactions: Transaction[]; description: string } | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  // Memoized handlers to prevent child re-renders
  const handleEdit = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  }, []);

  const handleDelete = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteGroup = useCallback((transactions: Transaction[], description: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroup({ transactions, description });
    setIsDeleteGroupDialogOpen(true);
  }, []);

  const toggleMonth = useCallback((monthKey: string) => {
    setExpandedMonths(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(monthKey)) {
        newExpanded.delete(monthKey);
      } else {
        newExpanded.add(monthKey);
        // Scroll to the expanded month after state updates
        setTimeout(() => {
          const element = document.getElementById(`month-${monthKey}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200); // Small delay for animation to start
      }
      return newExpanded;
    });
  }, []);

  const toggleDescription = useCallback((descriptionKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDescriptions(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(descriptionKey)) {
        newExpanded.delete(descriptionKey);
      } else {
        newExpanded.add(descriptionKey);
        /*
        // Scroll to the expanded description after state updates
        setTimeout(() => {
          const element = document.getElementById(`desc-${descriptionKey}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150); // Small delay for animation to start
        */
      }
      return newExpanded;
    });
  }, []);

  // Expose method to parent via ref for auto-expand and scroll
  useImperativeHandle(ref, () => ({
    expandAndScrollToTransaction: (date: Date, description: string | null, type: OperationType) => {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString();
      const monthKey = `${year}-${month}`;

      const typePrefix = type === OperationType.INCOME ? 'income' :
                         type === OperationType.EXPENSE ? 'expense' : 'withdrawal';
      const descKey = `${typePrefix}-${monthKey}-${description || ''}`;

      setExpandedMonths(prev => new Set(prev).add(monthKey));
      setExpandedDescriptions(prev => new Set(prev).add(descKey));

      setTimeout(() => {
        const element = document.getElementById(descKey);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
          }, 2000);
        }
      }, 350);
    },
  }), []);

  // Memoized formatCurrency to prevent re-creation
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }, []);

  const getMonthName = useCallback((monthNum: string) => {
    const date = new Date(2000, parseInt(monthNum) - 1, 1);
    return format(date, 'MMMM').toUpperCase();
  }, []);

  const getMonthNameShort = useCallback((monthNum: string) => {
    const date = new Date(2000, parseInt(monthNum) - 1, 1);
    return format(date, 'MMM').toUpperCase();
  }, []);

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
        <Card key={yearData.year} className="p-0 gap-2">
          {/* Year Header */}
          <div className="border-b bg-muted/50 px-6 py-3">
            <h3 className="text-xl font-bold text-primary">{yearData.year}</h3>
          </div>

          {/* Months Table */}
          <Table className="sm:table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-8 sm:w-[5%]"></TableHead>
                <TableHead className="sm:w-[5%]">Month</TableHead>
                <TableHead className="text-right sm:w-[24%]">Expenses</TableHead>
                <TableHead className="text-right sm:w-[34%]">Income</TableHead>
                <TableHead className="text-right font-semibold sm:w-[10%]">Total</TableHead>
                <TableHead className="text-right hidden sm:table-cell sm:w-[20%]">Withdrawals</TableHead>
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
                      id={`month-${monthKey}`}
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
                        <span className="hidden md:inline">{getMonthName(monthData.month)}</span>
                        <span className="md:hidden">{getMonthNameShort(monthData.month)}</span>
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
                          <div className="hidden sm:grid sm:grid-cols-[0%_0%_35%_35%_6%_24%] py-3">
                            <div></div>
                            <div></div>
                            {/* Expense Column */}
                            <div className="px-2">
                              <div className="space-y-2">
                                {monthData.expenseTransactions.map((group) => {
                                  const descKey = `expense-${monthKey}-${group.description}`;
                                  return (
                                    <TransactionGroup
                                      key={group.description}
                                      group={group}
                                      descKey={descKey}
                                      isExpanded={expandedDescriptions.has(descKey)}
                                      colorClass="text-red-600 dark:text-red-400"
                                      onToggle={toggleDescription}
                                      onDeleteGroup={handleDeleteGroup}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                      formatCurrency={formatCurrency}
                                    />
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
                                  return (
                                    <TransactionGroup
                                      key={group.description}
                                      group={group}
                                      descKey={descKey}
                                      isExpanded={expandedDescriptions.has(descKey)}
                                      colorClass="text-green-600 dark:text-green-400"
                                      onToggle={toggleDescription}
                                      onDeleteGroup={handleDeleteGroup}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                      formatCurrency={formatCurrency}
                                    />
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
                                      <WithdrawalItem
                                        key={transaction.id}
                                        transaction={transaction}
                                        onDelete={handleDelete}
                                        formatCurrency={formatCurrency}
                                      />
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
                                  return (
                                    <TransactionGroup
                                      key={group.description}
                                      group={group}
                                      descKey={descKey}
                                      isExpanded={expandedDescriptions.has(descKey)}
                                      colorClass="text-red-600 dark:text-red-400"
                                      onToggle={toggleDescription}
                                      onDeleteGroup={handleDeleteGroup}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                      formatCurrency={formatCurrency}
                                    />
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
                                  return (
                                    <TransactionGroup
                                      key={group.description}
                                      group={group}
                                      descKey={descKey}
                                      isExpanded={expandedDescriptions.has(descKey)}
                                      colorClass="text-green-600 dark:text-green-400"
                                      onToggle={toggleDescription}
                                      onDeleteGroup={handleDeleteGroup}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                      formatCurrency={formatCurrency}
                                    />
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
                                  <WithdrawalItem
                                    key={transaction.id}
                                    transaction={transaction}
                                    onDelete={handleDelete}
                                    formatCurrency={formatCurrency}
                                  />
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
        onTransactionEdited={(transaction) => {
          // Refetch transactions after edit
          onRefetchTransactions?.();

          // Then expand and scroll
          if (ref && typeof ref === 'object' && ref.current) {
            setTimeout(() => {
              ref.current?.expandAndScrollToTransaction(
                transaction.date,
                transaction.description,
                transaction.type
              );
            }, 500);
          }
        }}
      />

      <DeleteTransactionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        transaction={selectedTransaction}
        onTransactionDeleted={() => {
          // Refetch transactions after delete
          onRefetchTransactions?.();
        }}
      />

      <DeleteGroupDialog
        open={isDeleteGroupDialogOpen}
        onOpenChange={setIsDeleteGroupDialogOpen}
        transactions={selectedGroup?.transactions || []}
        description={selectedGroup?.description || ''}
        onGroupDeleted={() => {
          // Refetch transactions after group delete
          onRefetchTransactions?.();
        }}
      />
    </div>
  );
});
