'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useGetDescriptionsQuery } from '@/store/api/descriptionsApi';
import { OperationType } from '@/types';
import { DescriptionTabs } from '@/components/settings/DescriptionTabs';
import { AddDescriptionDialog } from '@/components/settings/AddDescriptionDialog';

export default function DescriptionsPage() {
  const { data: descriptionsRes, isLoading } = useGetDescriptionsQuery(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<OperationType.INCOME | OperationType.EXPENSE>(OperationType.INCOME);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
            <p className="text-muted-foreground">Create, update, and delete transaction categories</p>
          </div>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      ) : !descriptionsRes ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Failed to load categories</p>
          </CardContent>
        </Card>
      ) : descriptionsRes.earningDescription.length === 0 && descriptionsRes.expenseDescription.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No categories found</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Create Your First Category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DescriptionTabs
          descriptionsResponse={descriptionsRes}
          onTypeChange={setSelectedType}
        />
      )}

      {/* Add Description Dialog */}
      <AddDescriptionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        defaultType={selectedType}
      />
    </div>
  );
}

