'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft, Edit, Trash2 } from 'lucide-react';
import { useGetTransactionListQuery } from '@/store/api/transactionsApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addTransactions,
  incrementPage,
  resetTransactionList,
} from '@/store/slices/transactionListSlice';
import { type Transaction, OperationType } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { EditTransactionDialog } from '@/components/transactions/EditTransactionDialog';
import { DeleteTransactionDialog } from '@/components/transactions/DeleteTransactionDialog';
import { useState } from 'react';

const PAGE_SIZE = 20;

export default function TransactionListPage() {
  const dispatch = useAppDispatch();
  const { transactions, totalCount, currentPage, hasMore } = useAppSelector(
    (state) => state.transactionList
  );
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetTransactionListQuery({
    pageIndex: currentPage,
    pageSize: PAGE_SIZE,
  });

  // Reset on mount
  useEffect(() => {
    dispatch(resetTransactionList());
  }, [dispatch]);

  // Add fetched transactions to Redux store
  useEffect(() => {
    if (data?.transactions) {
      dispatch(
        addTransactions({
          transactions: data.transactions,
          totalCount: data.totalCount,
        })
      );
    }
  }, [data, dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

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

  const getTypeIcon = (type: OperationType) => {
    switch (type) {
      case 'ENTRATA':
        return <ArrowUpCircle className="h-4 w-4" />;
      case 'USCITA':
        return <ArrowDownCircle className="h-4 w-4" />;
      case 'PRELIEVO':
        return <ArrowRightLeft className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: OperationType) => {
    switch (type) {
      case 'ENTRATA':
        return 'text-green-600 dark:text-green-500';
      case 'USCITA':
        return 'text-red-600 dark:text-red-500';
      case 'PRELIEVO':
        return 'text-blue-600 dark:text-blue-500';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>
              View all transactions in chronological order
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && currentPage === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No transactions found
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Scrollable Table Container with Fixed Header */}
                <div className="rounded-md border bg-background">
                  <div className="relative overflow-hidden">
                    {/* Scrollable Container */}
                    <div className="overflow-auto max-h-[calc(100vh-350px)] scrollbar-thin">
                      <Table>
                        {/* Sticky Header */}
                        <TableHeader className="sticky top-0 z-10 bg-muted/90 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-20 font-semibold">Date</TableHead>
                            <TableHead className="w-12 text-center font-semibold">Type</TableHead>
                            <TableHead className="w-28 text-right font-semibold">Amount</TableHead>
                            <TableHead className="min-w-[200px] font-semibold">Description</TableHead>
                            <TableHead className="w-32 font-semibold">Account</TableHead>
                            <TableHead className="w-20 text-center font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        {/* Scrollable Body */}
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id} className="hover:bg-muted/50">
                              {/* Date with Day of Week */}
                              <TableCell className="py-3">
                                <div className="flex flex-col">
                                  <span className="text-xs font-medium text-muted-foreground">
                                    {format(new Date(transaction.date), 'EEE', { locale: it }).toUpperCase()}
                                  </span>
                                  <span className="text-sm">
                                    {format(new Date(transaction.date), 'dd/MM/yy', { locale: it })}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Type Icon */}
                              <TableCell className="text-center py-3">
                                <div className={`flex justify-center ${getTypeColor(transaction.type)}`}>
                                  {getTypeIcon(transaction.type)}
                                </div>
                              </TableCell>

                              {/* Amount */}
                              <TableCell className="text-right py-3">
                                <span className={`font-semibold ${getTypeColor(transaction.type)}`}>
                                  {formatCurrency(transaction.amount)}
                                </span>
                              </TableCell>

                              {/* Description with Additional Notes */}
                              <TableCell className="py-3">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-sm font-medium">
                                    {transaction.description || '-'}
                                  </span>
                                  {transaction.additionalNotes && (
                                    <span className="text-xs text-muted-foreground line-clamp-2">
                                      {transaction.additionalNotes}
                                    </span>
                                  )}
                                </div>
                              </TableCell>

                              {/* Bill/Account */}
                              <TableCell className="py-3">
                                <span className="text-sm">
                                  {transaction.bill.description}
                                </span>
                                {transaction.billFromWhichWithdraw && transaction.type === OperationType.WITHDRAWAL && (
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    da: {transaction.billFromWhichWithdraw.description}
                                  </div>
                                )}
                              </TableCell>

                              {/* Actions */}
                              <TableCell className="text-center py-3">
                                <div className="flex justify-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(transaction)}
                                    className="h-8 w-8"
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(transaction)}
                                    className="h-8 w-8"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer Section */}
                <div className="space-y-3">
                  {hasMore && (
                    <div className="flex justify-center">
                      <Button
                        onClick={handleLoadMore}
                        disabled={isFetching}
                        variant="outline"
                        size="lg"
                      >
                        {isFetching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Caricamento...
                          </>
                        ) : (
                          'Carica Altri'
                        )}
                      </Button>
                    </div>
                  )}

                  <div className="text-center text-sm text-muted-foreground">
                    Visualizzate {transactions.length} di {totalCount} transazioni
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      {selectedTransaction && (
        <>
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
        </>
      )}
    </>
  );
}



