'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tags, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Profile Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>View your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground mb-4">
              View and manage your personal account information, email, and account status.
            </p>
            <Button asChild>
              <Link href="/profile">
                View Profile
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Description Management Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tags className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage transaction categories</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground mb-4">
              Create, update, and delete transaction categories (descriptions) for organizing your income and expenses.
            </p>
            <Button asChild>
              <Link href="/settings/descriptions">
                Manage Categories
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* More settings can be added here in the future */}
        {/* Example: Notifications, Preferences, etc. */}
      </div>
    </div>
  );
}

