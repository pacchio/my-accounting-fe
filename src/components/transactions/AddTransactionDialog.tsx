'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddTransactionMutation } from '@/store/api/transactionsApi';
import { useGetTotalsQuery } from '@/store/api/totalsApi';
import { useGetDescriptionsQuery } from '@/store/api/descriptionsApi';
import { OperationType } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const addTransactionSchema = z.object({
  type: z.nativeEnum(OperationType),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().optional(),
  additionalNotes: z.string().optional(),
  date: z.date(),
  billId: z.number().positive('Select an account'),
  billFromWhichWithdrawId: z.number().positive().optional(),
});

type AddTransactionFormValues = z.infer<typeof addTransactionSchema>;

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTransactionDialog({ open, onOpenChange }: AddTransactionDialogProps) {
  const [addTransaction, { isLoading }] = useAddTransactionMutation();
  const { data: totals } = useGetTotalsQuery();
  const { data: descriptions, isLoading: isLoadingDescriptions, error: descriptionsError } = useGetDescriptionsQuery(false);
  const [createAnother, setCreateAnother] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const form = useForm<AddTransactionFormValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: OperationType.EXPENSE,
      description: '',
      additionalNotes: '',
      date: new Date(),
    },
  });

  const selectedType = form.watch('type');
  const isWithdrawal = selectedType === OperationType.WITHDRAWAL;

  // Filter descriptions by type
  const filteredDescriptions = Array.isArray(descriptions)
    ? descriptions.filter((desc) => desc.type === selectedType)
    : [];

  // Debug descriptions
  console.log('Descriptions API:', {
    data: descriptions,
    isLoading: isLoadingDescriptions,
    error: descriptionsError,
    isArray: Array.isArray(descriptions),
    length: descriptions?.length,
    filteredLength: filteredDescriptions.length,
    selectedType,
  });

  const onSubmit = async (data: AddTransactionFormValues) => {
    try {
      await addTransaction({
        type: data.type,
        amount: data.amount,
        description: data.description || null,
        additionalNotes: data.additionalNotes || null,
        date: data.date,
        bill: { id: data.billId },
        billFromWhichWithdraw: data.billFromWhichWithdrawId
          ? { id: data.billFromWhichWithdrawId }
          : null,
      }).unwrap();

      toast.success('Transaction added successfully');

      if (createAnother) {
        // Keep type, date, and accounts - only reset amount and notes
        form.setValue('amount', 0);
        form.setValue('description', '');
        form.setValue('additionalNotes', '');
      } else {
        form.reset();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error('Error adding transaction');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Add a new income, expense, or withdrawal
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Row 1: Amount and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Amount (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description (Searchable Combobox - only for non-withdrawals) */}
              {!isWithdrawal ? (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
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
              ) : (
                <div></div>
              )}
            </div>

            {/* Row 2: Type and Account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Transaction Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={OperationType.INCOME}>Income</SelectItem>
                        <SelectItem value={OperationType.EXPENSE}>Expense</SelectItem>
                        <SelectItem value={OperationType.WITHDRAWAL}>Withdrawal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account */}
              <FormField
                control={form.control}
                name="billId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {isWithdrawal ? 'Destination Account' : 'Account'}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value, 10))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {totals?.map((total) => (
                          <SelectItem key={total.id} value={total.id.toString()}>
                            {total.description} ({new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total.amount)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Date and Source Account (if withdrawal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Source Account (only for withdrawals) */}
              {isWithdrawal ? (
                <FormField
                  control={form.control}
                  name="billFromWhichWithdrawId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Source Account</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value, 10))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select source account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {totals?.map((total) => (
                            <SelectItem key={total.id} value={total.id.toString()}>
                              {total.description} ({new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total.amount)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div></div>
              )}
            </div>

            {/* Row 4: Additional Notes (Full Width) */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Additional Notes (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Notes..." className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Footer with Checkbox and Buttons */}
        <DialogFooter className="flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="createAnother"
              checked={createAnother}
              onCheckedChange={(checked) => setCreateAnother(checked === true)}
            />
            <label
              htmlFor="createAnother"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Create another transaction
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setCreateAnother(false);
                onOpenChange(false);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
              {isLoading ? 'Saving...' : 'Add'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
