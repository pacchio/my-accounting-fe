'use client';

import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useGetUserInfoQuery } from '@/store/api/authApi';
import { loginSuccess } from '@/store/slices/authSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const { data: userInfo, isLoading } = useGetUserInfoQuery();
  const hasUpdatedProvider = useRef(false);

  // Update Redux state when userInfo is loaded (only once)
  useEffect(() => {
    if (userInfo && token && user && !hasUpdatedProvider.current && userInfo.provider && userInfo.provider !== user.provider) {
      hasUpdatedProvider.current = true;
      dispatch(
        loginSuccess({
          token,
          user: {
            ...user,
            provider: userInfo.provider,
          },
        })
      );
    }
  }, [userInfo, token, user, dispatch]);

  if (isLoading) {
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
          <CardContent className="py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !userInfo) {
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

  const provider = userInfo.provider || user.provider || 'local';

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

          {/* Name */}
          {(userInfo.firstname || userInfo.lastname) && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Name
              </label>
              <div className="px-3 py-2 rounded-md bg-muted/50 text-sm font-medium">
                {userInfo.firstname} {userInfo.lastname}
              </div>
            </div>
          )}

          {/* Authentication Provider */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Authentication Method
            </label>
            <div className="px-3 py-2 rounded-md bg-muted/50">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  provider === 'google'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                {provider === 'google' ? '🔵 Google Account' : '✉️ Email & Password'}
              </span>
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

