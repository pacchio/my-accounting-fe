'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useGetTotalsQuery, useUpdateTotalsMutation } from '@/store/api/totalsApi';
import { Total, TotalUpdateRequest } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

interface UpdateTotalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateTotalsDialog({ open, onOpenChange }: UpdateTotalsDialogProps) {
  const { data: totals } = useGetTotalsQuery();
  const [updateTotals, { isLoading }] = useUpdateTotalsMutation();

  const [localTotals, setLocalTotals] = useState<TotalUpdateRequest[]>([]);

  useEffect(() => {
    if (totals) {
      setLocalTotals(
        totals.map((t) => ({
          id: t.id,
          amount: t.amount,
          description: t.description,
          canDelete: t.canDelete,
        }))
      );
    }
  }, [totals]);

  const handleAddAccount = () => {
    setLocalTotals([
      ...localTotals,
      {
        id: null,
        amount: 0,
        description: 'New Account',
        canDelete: true,
      },
    ]);
  };

  const handleRemoveAccount = (index: number) => {
    setLocalTotals(localTotals.filter((_, i) => i !== index));
  };

  const handleUpdateAccount = (index: number, field: keyof TotalUpdateRequest, value: any) => {
    const updated = [...localTotals];
    updated[index] = { ...updated[index], [field]: value };
    setLocalTotals(updated);
  };

  const handleSave = async () => {
    try {
      await updateTotals(localTotals).unwrap();
      toast.success('Accounts updated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Error updating accounts');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Accounts</DialogTitle>
          <DialogDescription>
            Edit your bank accounts and wallets. Balances will be updated automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {localTotals.map((total, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`description-${index}`}>Account Name</Label>
                      <Input
                        id={`description-${index}`}
                        value={total.description}
                        onChange={(e) => handleUpdateAccount(index, 'description', e.target.value)}
                        placeholder="e.g. Checking Account, Cash..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`amount-${index}`}>Current Balance (€)</Label>
                      <Input
                        id={`amount-${index}`}
                        type="number"
                        step="0.01"
                        value={total.amount}
                        onChange={(e) =>
                          handleUpdateAccount(index, 'amount', parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>

                  {total.canDelete && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAccount(index)}
                      className="mt-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {!total.canDelete && (
                  <p className="text-xs text-muted-foreground">
                    This account cannot be deleted
                  </p>
                )}
              </div>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddAccount}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Account
          </Button>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
