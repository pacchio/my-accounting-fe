'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useUpdateTransactionMutation } from '@/store/api/transactionsApi';
import { useGetDescriptionsQuery } from '@/store/api/descriptionsApi';
import { OperationType, Transaction } from '@/types';
import { format } from 'date-fns';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const editTransactionSchema = z.object({
  id: z.number(),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type EditTransactionFormValues = z.infer<typeof editTransactionSchema>;

interface EditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  transaction,
}: EditTransactionDialogProps) {
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();
  const { data: descriptions, isLoading: isLoadingDescriptions } = useGetDescriptionsQuery(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const form = useForm<EditTransactionFormValues>({
    resolver: zodResolver(editTransactionSchema),
  });

  const isWithdrawal = transaction?.type === OperationType.WITHDRAWAL;

  // Filter descriptions by transaction type
  const filteredDescriptions = Array.isArray(descriptions) && transaction
    ? descriptions.filter((desc) => desc.type === transaction.type)
    : [];

  // Update form when transaction changes
  useEffect(() => {
    if (transaction) {
      form.reset({
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description || '',
        additionalNotes: transaction.additionalNotes || '',
      });
    }
  }, [transaction, form]);

  const onSubmit = async (data: EditTransactionFormValues) => {
    if (!transaction) return;

    try {
      await updateTransaction({
        id: data.id,
        type: transaction.type, // Keep original type
        amount: data.amount,
        description: data.description || null,
        additionalNotes: data.additionalNotes || null,
        date: new Date(transaction.date), // Keep original date
        bill: { id: transaction.bill.id || 0 }, // Keep original account
        billFromWhichWithdraw: transaction.billFromWhichWithdraw?.id
          ? { id: transaction.billFromWhichWithdraw.id }
          : null, // Keep original source account
      }).unwrap();

      toast.success('Transaction updated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Error updating transaction');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Modify transaction details
          </DialogDescription>
        </DialogHeader>

        {/* Read-only Transaction Info */}
        {transaction && (
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">
                {transaction.type === OperationType.INCOME
                  ? 'Income'
                  : transaction.type === OperationType.EXPENSE
                  ? 'Expense'
                  : 'Withdrawal'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">
                {format(new Date(transaction.date), 'dd/MM/yyyy')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account:</span>
              <span className="font-medium">{transaction.bill.description}</span>
            </div>
            {isWithdrawal && transaction.billFromWhichWithdraw && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source Account:</span>
                <span className="font-medium">{transaction.billFromWhichWithdraw.description}</span>
              </div>
            )}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      autoFocus={false}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (Searchable Combobox - only for non-withdrawals) */}
            {!isWithdrawal && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Description</FormLabel>
                    <Popover open={descriptionOpen} onOpenChange={setDescriptionOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value || 'Select or type description'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Search or type new..."
                            value={field.value}
                            onValueChange={field.onChange}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && field.value) {
                                e.preventDefault();
                                field.onChange(field.value.toUpperCase());
                                setDescriptionOpen(false);
                              }
                            }}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {isLoadingDescriptions ? (
                                'Loading...'
                              ) : field.value ? (
                                <div className="py-6 text-center text-sm">
                                  <p>No results found.</p>
                                  <p className="text-muted-foreground">Press Enter to use &quot;{field.value}&quot;</p>
                                </div>
                              ) : (
                                'Type to search or create new'
                              )}
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredDescriptions
                                .filter((desc) =>
                                  desc.description.toLowerCase().includes((field.value || '').toLowerCase())
                                )
                                .map((desc) => (
                                  <CommandItem
                                    key={desc.id}
                                    value={desc.description}
                                    onSelect={(value) => {
                                      field.onChange(value.toUpperCase());
                                      setDescriptionOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        field.value?.toUpperCase() === desc.description ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {desc.description}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Notes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
