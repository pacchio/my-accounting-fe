'use client';

import { useState, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Loader2, Search, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetUsersQuery } from '@/store/api/adminApi';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const PAGE_SIZE = 50;

export function UserManagement() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading } = useGetUsersQuery({
    pageIndex,
    pageSize: PAGE_SIZE,
    search: debouncedSearch,
  });

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPp', { locale: enUS });
    } catch {
      return 'Invalid date';
    }
  };

  const getRoleColor = (role: string) => {
    if (role === 'ROLE_ADMIN' || role === 'ROLE_USER_ADMIN') {
      return 'text-red-600 dark:text-red-400 font-medium';
    }
    return 'text-blue-600 dark:text-blue-400';
  };

  if (isLoading && !data) {
    return (
      <Card>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">Failed to load users</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by username, email, or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="text-sm">{user.email}</TableCell>
                  <TableCell className="text-sm">
                    {user.firstname} {user.lastname}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.enabled ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-xs font-medium text-red-600">Inactive</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {user.roles.length === 0 ? (
                        <span className="text-xs text-muted-foreground">No roles</span>
                      ) : (
                        user.roles.map((role) => (
                          <div key={role} className={`text-xs ${getRoleColor(role)}`}>
                            {role === 'ROLE_ADMIN'
                              ? 'Administrator'
                              : role === 'ROLE_USER_ADMIN'
                                ? 'User Admin'
                                : 'User'}
                          </div>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(user.registration_date)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {pageIndex * PAGE_SIZE + 1} to {Math.min((pageIndex + 1) * PAGE_SIZE, data.totalCount)} of{' '}
            {data.totalCount} users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
              disabled={pageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              Page {pageIndex + 1} of {data.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(Math.min(data.totalPages - 1, pageIndex + 1))}
              disabled={pageIndex >= data.totalPages - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

