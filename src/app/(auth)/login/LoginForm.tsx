'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLoginMutation, useGoogleLoginMutation } from '@/store/api/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginSuccess } from '@/store/slices/authSlice';
import { decodeJWT } from '@/lib/utils/jwt';
import { toast } from 'sonner';
import { LogIn, Home } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Required field'),
  password: z.string().min(1, 'Password required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show verification messages from URL parameters
  useEffect(() => {
    if (!isMounted) return;

    const verified = searchParams.get('verified');
    const message = searchParams.get('message');
    const error = searchParams.get('error');

    if (verified === 'true' && message) {
      toast.success(message, { duration: 5000 });
      // Clean URL parameters
      window.history.replaceState({}, '', '/login');
    } else if (error) {
      toast.error(error, { duration: 5000 });
      // Clean URL parameters
      window.history.replaceState({}, '', '/login');
    }
  }, [isMounted, searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, isMounted]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();

      // Decode JWT to get user info
      const user = decodeJWT(result.token);

      if (!user) {
        toast.error('Error decoding token');
        return;
      }

      // Update Redux state
      dispatch(loginSuccess({
        token: result.token,
        user,
      }));

      toast.success('Login successful');
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || 'Invalid credentials';
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error('Google login failed');
      return;
    }

    try {
      const result = await googleLogin({
        credential: credentialResponse.credential
      }).unwrap();

      // Decode JWT to get user info
      const user = decodeJWT(result.token);

      if (!user) {
        toast.error('Error decoding token');
        return;
      }

      // Update Redux state
      dispatch(loginSuccess({
        token: result.token,
        user,
      }));

      toast.success('Google login successful');
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || 'Google login failed';
      toast.error(errorMessage);
    }
  };

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <LogIn className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your My Accounting account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {googleClientId && (
            <>
              <div className="flex justify-center">
                <GoogleOAuthProvider clientId={googleClientId}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      toast.error('Google login failed');
                    }}
                    useOneTap
                    theme="outline"
                    size="large"
                    text="signin_with"
                    width="100%"
                  />
                </GoogleOAuthProvider>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe or john@example.com"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/registration" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

