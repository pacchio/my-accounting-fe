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
import { useDeleteTransactionListMutation } from '@/store/api/transactionsApi';
import { Transaction, DeleteTransactionItem } from '@/types';
import { toast } from 'sonner';

interface DeleteGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactions: Transaction[];
  description: string;
  onGroupDeleted?: () => void;
}

export function DeleteGroupDialog({
  open,
  onOpenChange,
  transactions,
  description,
  onGroupDeleted,
}: DeleteGroupDialogProps) {
  const [deleteTransactionList, { isLoading }] = useDeleteTransactionListMutation();

  const handleDeleteGroup = async () => {
    if (!transactions || transactions.length === 0) return;

    try {
      // Convert transactions to DeleteTransactionItem format
      const deleteItems: DeleteTransactionItem[] = transactions.map((t) => ({
        id: t.id,
        type: t.type,
        amount: t.amount,
        bill: { id: t.bill.id || 0 },
        billFromWhichWithdraw: t.billFromWhichWithdraw?.id
          ? { id: t.billFromWhichWithdraw.id }
          : null,
      }));

      await deleteTransactionList(deleteItems).unwrap();
      toast.success(`${transactions.length} transactions deleted successfully`);
      onOpenChange(false);

      // Trigger refetch
      onGroupDeleted?.();
    } catch (error) {
      toast.error('Error deleting transactions');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction Group</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete all {transactions.length} transactions in "{description}"?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-lg border bg-muted p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span className="font-medium">{description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transactions:</span>
              <span className="font-semibold">{transactions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteGroup}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? 'Deleting...' : `Delete ${transactions.length} Transactions`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
