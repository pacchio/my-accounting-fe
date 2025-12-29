import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/transactions', '/settings', '/admin'];

// Auth routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/registration'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has a token (stored in cookie or will be checked client-side)
  // For now, we'll handle auth client-side with Redux
  // This middleware can be enhanced later for server-side auth checks

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
