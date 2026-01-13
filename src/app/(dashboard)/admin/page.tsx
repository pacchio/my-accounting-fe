'use client';

import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { UserManagement } from '@/components/admin/UserManagement';

export default function AdminPage() {
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_USER_ADMIN';

  // Redirect non-admin users
  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
        <p className="text-muted-foreground">Manage application settings and users</p>
      </div>

      {/* User Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <UserManagement />
        </CardContent>
      </Card>

      {/* System Logs Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>Coming Soon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            View system activity logs and audit trails. This feature is coming soon.
          </p>
          <div className="bg-muted/50 rounded px-3 py-2 text-xs text-muted-foreground">
            Planned information:
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Login history</li>
              <li>Data modifications</li>
              <li>Error logs</li>
              <li>API activity</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Application Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Coming Soon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure application-wide settings and features. This feature is coming soon.
          </p>
          <div className="bg-muted/50 rounded px-3 py-2 text-xs text-muted-foreground">
            Planned options:
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>System configuration</li>
              <li>Email settings</li>
              <li>Feature flags</li>
              <li>Maintenance mode</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Statistics</CardTitle>
          <CardDescription>Overview of application usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">--</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold">--</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
              <p className="text-2xl font-bold">--</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Developer Information</CardTitle>
          <CardDescription>System and API information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Frontend Version</p>
              <p className="text-sm font-mono">2.0.0</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">React Version</p>
              <p className="text-sm font-mono">19.2+</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Next.js Version</p>
              <p className="text-sm font-mono">16.1.0</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Environment</p>
              <p className="text-sm font-mono">Production</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

