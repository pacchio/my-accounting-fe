'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteTransactionMutation } from '@/store/api/transactionsApi';
import { Transaction } from '@/types';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface DeleteTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transaction,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  const handleDelete = async () => {
    if (!transaction) return;

    try {
      await deleteTransaction(transaction.id).unwrap();
      toast.success('Transaction deleted successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Error deleting transaction');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {transaction && (
          <div className="rounded-lg border bg-muted p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">
                  {transaction.type === 'ENTRATA'
                    ? 'Income'
                    : transaction.type === 'USCITA'
                    ? 'Expense'
                    : 'Withdrawal'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">{formatCurrency(transaction.amount)}</span>
              </div>
              {transaction.description && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="font-medium">{transaction.description}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{format(new Date(transaction.date), 'dd/MM/yyyy')}</span>
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
