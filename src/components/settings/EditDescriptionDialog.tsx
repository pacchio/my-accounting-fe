'use client';

import { useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { useUpdateDescriptionMutation } from '@/store/api/descriptionsApi';
import { Description } from '@/types';
import { toast } from 'sonner';

const editDescriptionSchema = z.object({
  description: z.string().min(1, 'Category name is required').max(100, 'Category name is too long'),
});

type EditDescriptionFormValues = z.infer<typeof editDescriptionSchema>;

interface EditDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: Description | null;
}

export function EditDescriptionDialog({
  open,
  onOpenChange,
  description,
}: EditDescriptionDialogProps) {
  const [updateDescription, { isLoading }] = useUpdateDescriptionMutation();

  const form = useForm<EditDescriptionFormValues>({
    resolver: zodResolver(editDescriptionSchema),
    defaultValues: {
      description: '',
    },
  });

  useEffect(() => {
    if (description) {
      form.reset({
        description: description.description,
      });
    }
  }, [description, form]);

  const onSubmit = async (data: EditDescriptionFormValues) => {
    if (!description) return;

    try {
      await updateDescription({
        id: description.id,
        type: description.type,
        description: data.description,
      }).unwrap();

      toast.success('Category updated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Error updating category');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category name
          </DialogDescription>
        </DialogHeader>

        {description && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {description.type === 'ENTRATA' ? 'Income' : 'Expense'}
                </p>
              </div>

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
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

