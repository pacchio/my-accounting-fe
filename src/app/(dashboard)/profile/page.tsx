'use client';

import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Unable to load profile information</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">View your account information</p>
        </div>
      </div>

      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your personal account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Username
            </label>
            <div className="px-3 py-2 rounded-md bg-muted/50 text-sm font-medium">
              {user.username}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email
            </label>
            <div className="px-3 py-2 rounded-md bg-muted/50 text-sm font-medium">
              {user.email}
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Role
            </label>
            <div className="px-3 py-2 rounded-md bg-muted/50 text-sm font-medium">
              {user.role === 'ROLE_ADMIN' || user.role === 'ROLE_USER_ADMIN' ? 'Administrator' : 'User'}
            </div>
          </div>

          {/* ID */}
          {/*<div>*/}
          {/*  <label className="block text-sm font-medium text-muted-foreground mb-2">*/}
          {/*    Account ID*/}
          {/*  </label>*/}
          {/*  <div className="px-3 py-2 rounded-md bg-muted/50 text-sm font-mono text-xs">*/}
          {/*    {user.person_id}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Your account is active and in good standing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email Verified</span>
            <span className="text-sm text-green-600 font-semibold">✓ Yes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Account Active</span>
            <span className="text-sm text-green-600 font-semibold">✓ Yes</span>
          </div>
        </CardContent>
      </Card>

      {/* Password & Security Card */}
      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle>Security</CardTitle>*/}
      {/*    <CardDescription>Manage your password and security settings</CardDescription>*/}
      {/*  </CardHeader>*/}
      {/*  <CardContent className="space-y-4">*/}
      {/*    <p className="text-sm text-muted-foreground mb-4">*/}
      {/*      Password management and additional security features coming soon.*/}
      {/*    </p>*/}
      {/*    <Button disabled>Change Password</Button>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </div>
  );
}

