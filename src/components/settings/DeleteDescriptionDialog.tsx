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
import { useDeleteDescriptionMutation } from '@/store/api/descriptionsApi';
import { Description } from '@/types';
import { toast } from 'sonner';

interface DeleteDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: Description | null;
}

export function DeleteDescriptionDialog({
  open,
  onOpenChange,
  description,
}: DeleteDescriptionDialogProps) {
  const [deleteDescription, { isLoading }] = useDeleteDescriptionMutation();

  const handleDelete = async () => {
    if (!description) return;

    try {
      await deleteDescription(description.id).unwrap();
      toast.success('Category deleted successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Error deleting category');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category?</AlertDialogTitle>
          <AlertDialogDescription>
            {description && (
              <>
                Are you sure you want to delete the category "<span className="font-semibold">{description.description}</span>"?
                <br />
                <br />
                This action cannot be undone. The category will be permanently removed.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

