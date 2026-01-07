'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { useUpdateDescriptionMutation } from '@/store/api/descriptionsApi';
import { OperationType } from '@/types';
import { toast } from 'sonner';

const addDescriptionSchema = z.object({
  type: z.enum([OperationType.INCOME, OperationType.EXPENSE]),
  description: z.string().min(1, 'Category name is required').max(100, 'Category name is too long'),
});

type AddDescriptionFormValues = z.infer<typeof addDescriptionSchema>;

interface AddDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: OperationType.INCOME | OperationType.EXPENSE;
}

export function AddDescriptionDialog({
  open,
  onOpenChange,
  defaultType = OperationType.INCOME,
}: AddDescriptionDialogProps) {
  const [addDescription, { isLoading }] = useUpdateDescriptionMutation();

  const form = useForm<AddDescriptionFormValues>({
    resolver: zodResolver(addDescriptionSchema),
    defaultValues: {
      type: defaultType as OperationType.INCOME | OperationType.EXPENSE,
      description: '',
    },
  });

  const onSubmit = async (data: AddDescriptionFormValues) => {
    try {
      await addDescription({
        id: 0,
        type: data.type,
        description: data.description,
      }).unwrap();

      toast.success('Category added successfully');
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error('Error adding category');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new transaction category for organizing your finances
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={OperationType.INCOME}>Income</SelectItem>
                      <SelectItem value={OperationType.EXPENSE}>Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Category'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

