'use client';

import { useState } from 'react';
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
import { Edit2, Trash2 } from 'lucide-react';
import { Description, OperationType } from '@/types';
import { EditDescriptionDialog } from './EditDescriptionDialog';
import { DeleteDescriptionDialog } from './DeleteDescriptionDialog';

interface DescriptionTableProps {
  descriptions: Description[];
  type: OperationType;
}

export function DescriptionTable({ descriptions, type }: DescriptionTableProps) {
  const [selectedDescription, setSelectedDescription] = useState<Description | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (description: Description) => {
    setSelectedDescription(description);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (description: Description) => {
    setSelectedDescription(description);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-right">Occurrences</TableHead>
              <TableHead className="text-right w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {descriptions.map((desc) => (
              <TableRow key={desc.id}>
                <TableCell className="font-medium">{desc.description}</TableCell>
                <TableCell className="text-right">
                  {desc.occurrences ?? 0}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(desc)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(desc)}
                    disabled={(desc.occurrences ?? 0) > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <EditDescriptionDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        description={selectedDescription}
      />

      <DeleteDescriptionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description={selectedDescription}
      />
    </>
  );
}

