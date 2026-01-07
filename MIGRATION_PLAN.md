# My Accounting Frontend - Migration Plan
## Angular 8 → Next.js 16 (React 19)

**Document Version:** 2.0
**Date:** December 21, 2025
**Author:** Migration Planning Team
**Updated:** Latest versions of all technologies (Node.js 24 LTS, Next.js 16, React 19, TypeScript 5.9)

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Technology Comparison](#technology-comparison)
4. [Migration Strategy](#migration-strategy)
5. [Step-by-Step Implementation Plan](#step-by-step-implementation-plan)
6. [Modern Design System (2025/26)](#modern-design-system-202526)
7. [Technical Decisions](#technical-decisions)
8. [Risk Assessment](#risk-assessment)
9. [Timeline & Milestones](#timeline--milestones)

---

## Executive Summary

### Project Overview
Migrate **my-accounting-fe** from Angular 8 (9 years old, legacy) to **Next.js 16** with React 19, modernizing the UI/UX for 2026 standards while maintaining feature parity with the existing application.

### Key Objectives
- ✅ Rebuild with modern React/Next.js ecosystem
- ✅ Create fresh, responsive 2025/26 design
- ✅ Maintain all existing functionality
- ✅ Improve mobile experience
- ✅ Use same backend API (my-accounting-be)
- ✅ Keep similar dashboard layout
- ✅ Modernize landing page completely

### Technology Stack (Target - December 2025)
| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | **24.x LTS** (Dec 2025) |
| Package Manager | Yarn | **4.x (Berry)** |
| Framework | Next.js (App Router + Turbopack) | **16.x** (latest stable) |
| UI Library | React | **19.2+** (stable) |
| Language | TypeScript | **5.9+** (latest) |
| Styling | Tailwind CSS + shadcn/ui | **4.2+** (stable) |
| State Management | Redux Toolkit + RTK Query | **2.x** (all-in-one) |
| Forms | React Hook Form + Zod | **7.55+ / 3.25+** |
| Charts | Recharts | **3.6+** |
| Date Handling | date-fns | **4.2+** |
| HTTP Client | RTK Query (built-in) | **Included in RTK** |
| Notifications | Sonner (via shadcn/ui) | **2.x** (official shadcn toast) |
| Authentication | Custom JWT (backend compatible) | N/A |

**Key Version Highlights (December 2025):**
- **Node.js 24 LTS**: New LTS release with enhanced performance, better V8 engine, improved ESM support
- **Yarn 4.x (Berry)**: Modern package manager with Plug'n'Play, zero-installs, workspace support, much faster than npm
- **Next.js 16**: Stable Turbopack in production, enhanced App Router, better RSC streaming, improved middleware
- **React 19.2**: Stable with Actions, Server Components, `use()` hook, compiler optimizations production-ready
- **TypeScript 5.9**: Enhanced type inference, decorator metadata, faster compilation, better error messages
- **Tailwind CSS 4.2**: Stable v4 with oxide engine (Rust-based), native CSS cascade layers, zero-config
- **TanStack Query v6**: Major update with improved TypeScript support, better DevTools, streaming support

---

## Current State Analysis

### Application Overview (Angular 8)

**Technology Stack:**
- Angular 8.2.4 (2019)
- NgRx (Redux) for state management
- Angular Material + Bootstrap 4
- Moment.js for dates
- Chart.js for visualizations
- JWT authentication
- AWS API Gateway backend

**Current Features:**

| Module | Features | Pages |
|--------|----------|-------|
| **Authentication** | Login, Registration, Google OAuth, Email verification | `/login`, `/registration` |
| **Dashboard** | Transaction overview, Add/Edit/Delete transactions, Filter by date/description, Update account balances | `/dashboard` |
| **Transactions** | Transaction list with pagination, Annual accounting (charts/tables), Trend analysis | `/transactions/*` |
| **Settings** | Manage transaction descriptions (categories), View usage statistics | `/settings/*` |
| **Administration** | User management (admin only), Edit/Delete users | `/admin/*` |
| **Public Pages** | Landing page, Privacy policy | `/home`, `/privacy` |

**Transaction Types:**
- **ENTRATA** (Income) - Adds to account balance
- **USCITA** (Expense) - Subtracts from account balance
- **PRELIEVO** (Withdrawal) - Transfers between accounts

**Key UI Components:**
- Responsive navbar with mobile menu
- Transaction accordion/expansion panels
- Modal dialogs for CRUD operations
- Date range picker (Italian format: DD/MM/YYYY)
- Toast notifications
- Data tables with sorting
- Charts (bar, line, pie)
- User profile dropdown

**Localization:**
- Italian language throughout
- Italian date format (DD/MM/YYYY)
- EUR currency formatting

---

## Technology Comparison

### Angular 8 vs Next.js 16

| Aspect | Angular 8 (2019) | Next.js 16 (2025) |
|--------|------------------|-------------------|
| **Paradigm** | Component-based (OOP) | Component-based (Functional) |
| **Learning Curve** | Steep | Moderate |
| **Bundle Size** | Larger (~200KB min) | Smaller (~90KB min) |
| **Performance** | Good | Excellent (RSC, streaming) |
| **State Management** | NgRx (required) | Built-in + optional libs |
| **Routing** | Angular Router | File-based routing |
| **SEO** | Limited (Angular Universal) | Excellent (SSR/SSG built-in) |
| **Developer Experience** | Good (CLI) | Excellent (DX-focused) |
| **Community** | Mature but declining | Growing rapidly |
| **Mobile Performance** | Good | Excellent |
| **TypeScript** | Full support | Full support |

### State Management Comparison

| Angular (NgRx) | Redux Toolkit + RTK Query |
|----------------|---------------------------|
| Actions/Reducers/Effects | Slices (actions + reducers) + API slices |
| Boilerplate-heavy | ~70% less code |
| Manual HTTP + RxJS | RTK Query (auto caching, refetching) |
| DevTools included | Excellent Redux DevTools |
| Effects for async | RTK Query endpoints (auto-generated) |

**Recommendation:** Use **Redux Toolkit with RTK Query** for both client AND server state. Perfect for NgRx users because:
- **Familiar Redux patterns** - Same mental model as NgRx
- **RTK Query = NgRx Effects on steroids** - Handles all API calls, caching, invalidation automatically
- **All-in-one solution** - No need for separate libraries (React Query, Axios, etc.)
- **Built-in Immer** - Write "mutating" code that's actually immutable
- **Automatic cache management** - Smart refetching, optimistic updates
- **TypeScript-first** - Excellent type inference for endpoints
- **Redux DevTools** - Time-travel debugging like NgRx
- **Similar to Angular HttpClient** - Familiar declarative API patterns

### UI Library Comparison

| Angular Material + Bootstrap | shadcn/ui + Tailwind CSS |
|------------------------------|--------------------------|
| Pre-built components | Composable primitives |
| Fixed styling | Fully customizable |
| Larger bundle | Smaller bundle |
| Material Design aesthetic | Custom design system |
| Angular-specific | Framework agnostic |

**Recommendation:** Use **shadcn/ui + Tailwind CSS** for maximum flexibility and modern design patterns.

---

## Migration Strategy

### Approach: Complete Rewrite (Not Gradual Migration)

**Rationale:**
1. Angular 8 → Next.js is not incrementally migratable
2. Opportunity to modernize architecture and design
3. Technology stacks are fundamentally different
4. Cleaner codebase without legacy patterns
5. Faster than attempting hybrid approach

### Parallel Development Strategy

```
my-accounting/
├── my-accounting-fe-old/     # Keep as reference (Angular 8)
├── my-accounting-fe/          # New Next.js app
└── my-accounting-be/          # Existing backend (unchanged)
```

### Migration Phases

**Phase 1: Foundation** (Week 1-2)
- Set up Next.js project
- Configure TypeScript, ESLint, Prettier
- Install core dependencies
- Set up authentication (NextAuth.js)
- Create base layout and navigation

**Phase 2: Authentication & Core** (Week 2-3)
- Login page
- Registration page
- JWT token management
- Protected routes
- API client setup

**Phase 3: Dashboard** (Week 3-5)
- Dashboard layout
- Transaction list components
- Add/Edit/Delete transaction modals
- Account balance management
- Filters and date pickers

**Phase 4: Transactions Module** (Week 5-6) ✅ **COMPLETED - January 3, 2026**
- ✅ Transaction list with pagination
- ✅ Annual accounting views
- ✅ Chart integration (Recharts)
- ✅ Trend analysis

**Phase 5: Settings & Admin** (Week 6-7)
- Description/category management
- Admin user management
- User profile

**Phase 6: Public Pages** (Week 7-8)
- New landing page design
- Privacy policy page
- OAuth integration (Google)

**Phase 7: Polish & Testing** (Week 8-10)
- Responsive design refinement
- Mobile optimization
- Cross-browser testing
- Performance optimization
- Accessibility audit

---

## Step-by-Step Implementation Plan

### React 19 & Next.js 16 - What's New (December 2025)

**React 19.2 Features (Production-Ready):**

1. **React Compiler (Stable)**
   - Automatic memoization - no more `useMemo`, `useCallback`
   - Significantly reduces re-renders
   - ~20-40% performance improvement out of the box

2. **Actions & `useActionState`**
   - Form actions with pending states built-in
   - Server Actions fully integrated (Next.js)
   - Simplified form handling without libraries

3. **`use()` Hook**
   - Read Promises and Context in render
   - Better async data fetching patterns
   - Works seamlessly with Suspense

4. **Ref as Prop (No forwardRef)**
   - Pass `ref` directly as a prop
   - Cleaner component APIs
   - Less boilerplate

5. **Enhanced Suspense & Streaming**
   - Better error boundaries
   - Improved Server Component streaming
   - Concurrent rendering optimizations

**Next.js 16 Major Features:**

1. **Turbopack (Stable in Production)**
   - 10x faster than Webpack (dev + production)
   - Zero-config, stable, production-ready
   - Built with Rust for maximum performance

2. **Partial Prerendering (PPR) - Stable**
   - Mix static and dynamic content seamlessly
   - Stream dynamic parts while serving static shell
   - Best of both worlds: SSG + SSR

3. **Enhanced App Router**
   - Better streaming with React 19 integration
   - Improved data fetching patterns
   - More intuitive caching API

4. **Server Components by Default**
   - All `app/` components are Server Components
   - Use `'use client'` for interactivity
   - Automatic code splitting

5. **Improved Middleware & Edge Runtime**
   - Better edge function support
   - More flexible request handling
   - Enhanced geolocation and A/B testing capabilities

**Migration Considerations (December 2025):**

- ✅ React 19 is now fully stable (19.2.1)
- ✅ React Compiler production-ready (opt-in, enabled via config)
- ✅ All major libraries compatible with React 19
- ✅ Turbopack is stable for production (Next.js 16)
- ✅ Replace `forwardRef` with direct `ref` props
- ✅ Remove manual `useMemo`/`useCallback` where React Compiler handles it
- ⚠️ Test caching behavior changes in Next.js 16
- ⚠️ Verify third-party component libraries for React 19 compatibility

---

### Step 1: Project Setup

**1.0 Prerequisites**
- Node.js 24.x LTS (December 2025 latest)
- Yarn 4.x (Berry) - Modern, fast package manager
- Volta (already installed) - For version management

Check versions:
```bash
node --version  # Should be v24.x.x
yarn --version  # Should be 4.x.x
volta --version  # Verify Volta is installed
```

**Using Volta (Recommended):**

Volta will automatically use the correct Node.js and Yarn versions specified in `package.json`.

No manual version management needed! Once you have the `package.json` with the `"volta"` field:
```json
{
  "volta": {
    "node": "24.12.0",
    "yarn": "4.5.1"
  }
}
```

Volta will automatically:
- ✅ Download and use Node.js 24.12.0
- ✅ Download and use Yarn 4.5.1
- ✅ Switch versions when you `cd` into the project
- ✅ Ensure team members use the same versions

If you need to manually install the versions:
```bash
# Volta will install these automatically from package.json
volta install node@24
volta install yarn@4
```

**1.1 Create Next.js Project**
```bash
# This will install the latest Next.js 16.x with React 19.2 and TypeScript 5.9+
npx create-next-app@latest my-accounting-fe --typescript --tailwind --app --src-dir --turbopack

cd my-accounting-fe
```

During setup, choose:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ✅ Turbopack (stable in Next.js 16)
- ❌ Customize default import alias (use default `@/*`)

**Note:** Next.js 16 has Turbopack stable in production builds!

**1.2 Install Core Dependencies**
```bash
# State Management (Redux Toolkit includes RTK Query)
yarn add @reduxjs/toolkit@latest react-redux@latest

# Forms & Validation
yarn add react-hook-form@latest @hookform/resolvers@latest zod@latest

# Date Handling
yarn add date-fns@latest

# Charts
yarn add recharts@latest

# Utilities (optional)
yarn add lodash-es@latest
yarn add -D @types/lodash-es@latest

# Note: Sonner will be installed automatically when you run: npx shadcn add sonner
# (shadcn/ui's official toast component as of 2025)
```

**1.3 Install shadcn/ui**

shadcn/ui will automatically install required Radix UI packages and utilities when you add components:

```bash
# Initialize shadcn/ui (installs core dependencies: tailwind-merge, clsx, etc.)
npx shadcn@latest init

# Add components one by one (each installs its required Radix UI package)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add table
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add calendar
npx shadcn@latest add popover
npx shadcn@latest add accordion
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add sheet
```

**What `shadcn init` automatically installs:**
- ✅ `tailwind-merge` - Merge Tailwind classes
- ✅ `clsx` - Conditional classes
- ✅ `class-variance-authority` - Component variants
- ✅ `lucide-react` - Icons
- ✅ Configures `components.json`

**What `shadcn add <component>` does:**
- ✅ Copies component code to `components/ui/`
- ✅ Automatically installs required Radix UI package (e.g., `@radix-ui/react-dialog`)
- ✅ Updates dependencies in `package.json`
- ✅ You own the code (can customize freely)

**You DON'T manually install Radix UI packages!** The CLI handles it.

**1.4 Project Structure**
```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Auth routes (layout group)
│   │   ├── login/
│   │   └── registration/
│   ├── (dashboard)/           # Protected routes
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── settings/
│   │   └── admin/
│   ├── api/                   # API routes
│   │   └── auth/
│   ├── layout.tsx
│   ├── page.tsx               # Landing page
│   └── privacy/
├── components/                 # React components
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Layout components (navbar, footer)
│   ├── dashboard/             # Dashboard-specific components
│   ├── transactions/          # Transaction components
│   └── auth/                  # Auth components
├── lib/                       # Utilities & configs
│   ├── api/                   # API client
│   ├── utils.ts               # Utility functions
│   ├── validations/           # Zod schemas
│   └── constants.ts           # Constants
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts
│   ├── useTransactions.ts
│   └── useTotals.ts
├── store/                     # Redux store
│   ├── index.ts              # Store configuration
│   ├── api/                  # RTK Query API slices
│   │   ├── apiSlice.ts       # Base API configuration
│   │   ├── authApi.ts        # Auth endpoints
│   │   ├── transactionsApi.ts# Transaction endpoints
│   │   ├── totalsApi.ts      # Totals endpoints
│   │   └── descriptionsApi.ts# Description endpoints
│   ├── slices/               # Redux slices (client state)
│   │   ├── authSlice.ts
│   │   └── uiSlice.ts
│   └── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
├── types/                     # TypeScript types
│   ├── transaction.ts
│   ├── user.ts
│   └── api.ts
└── styles/                    # Global styles
    └── globals.css
```

---

### Step 2: Redux Toolkit + RTK Query Setup

**2.1 Create RTK Query API Slice (`store/api/apiSlice.ts`)**

This is the base API configuration that all endpoints will extend:

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

// Define base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Base query with error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized
  if (result.error && result.error.status === 401) {
    // Logout user
    api.dispatch({ type: 'auth/logout' });
    window.location.href = '/login';
  }

  return result;
};

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Transactions', 'Totals', 'Descriptions', 'Users'],
  endpoints: () => ({}), // Endpoints will be injected
});
```

**2.2 Create API Endpoints for My-Accounting Backend**

Create Auth API endpoints (`store/api/authApi.ts`):
```typescript
import { apiSlice } from './apiSlice';

interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface UserInfo {
  person_id: number;
  email: string;
  username: string;
  role: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    getUserInfo: builder.query<UserInfo, void>({
      query: () => '/user-info',
      providesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/registration',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserInfoQuery, useRegisterMutation } = authApi;
```

Create Transactions API (`store/api/transactionsApi.ts`):
```typescript
import { apiSlice } from './apiSlice';

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => '/transaction/list-by-year-all',
      providesTags: ['Transactions'],
    }),
    getTransactionYears: builder.query<string[], void>({
      query: () => '/transaction/years',
      providesTags: ['Transactions'],
    }),
    getTransactionById: builder.query({
      query: (id: number) => `/transaction/${id}`,
      providesTags: (result, error, id) => [{ type: 'Transactions', id }],
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transaction/add',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),
    updateTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transaction/update',
        method: 'PUT',
        body: transaction,
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),
    deleteTransaction: builder.mutation({
      query: (id: number) => ({
        url: `/transaction/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),
    deleteTransactionList: builder.mutation({
      query: (transactions) => ({
        url: '/transaction/delete-transaction-list',
        method: 'POST',
        body: transactions,
      }),
      invalidatesTags: ['Transactions', 'Totals'],
    }),
    filterTransactionsByYear: builder.mutation({
      query: (filters) => ({
        url: '/transaction/list-by-year',
        method: 'POST',
        body: filters,
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionYearsQuery,
  useGetTransactionByIdQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useDeleteTransactionListMutation,
  useFilterTransactionsByYearMutation,
} = transactionsApi;
```

Create Totals API (`store/api/totalsApi.ts`):
```typescript
import { apiSlice } from './apiSlice';

export const totalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotals: builder.query({
      query: () => '/totals',
      providesTags: ['Totals'],
    }),
    updateTotals: builder.mutation({
      query: (totals) => ({
        url: '/update-totals',
        method: 'POST',
        body: totals,
      }),
      invalidatesTags: ['Totals'],
    }),
    getTotalsByDescription: builder.query({
      query: (year?: string) =>
        year ? `/total-by-description/${year}` : '/total-by-description-all',
      providesTags: ['Totals'],
    }),
  }),
});

export const {
  useGetTotalsQuery,
  useUpdateTotalsMutation,
  useGetTotalsByDescriptionQuery,
} = totalsApi;
```

Create Descriptions API (`store/api/descriptionsApi.ts`):
```typescript
import { apiSlice } from './apiSlice';

export const descriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDescriptions: builder.query({
      query: (withOccurrences = false) => `/description-list?occurrences=${withOccurrences}`,
      providesTags: ['Descriptions'],
    }),
    updateDescription: builder.mutation({
      query: (description) => ({
        url: '/update-description',
        method: 'POST',
        body: description,
      }),
      invalidatesTags: ['Descriptions', 'Transactions'],
    }),
    deleteDescription: builder.mutation({
      query: (id: number) => ({
        url: `/delete-description/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Descriptions'],
    }),
  }),
});

export const {
  useGetDescriptionsQuery,
  useUpdateDescriptionMutation,
  useDeleteDescriptionMutation,
} = descriptionsApi;
```

**Complete RTK Query API Reference**

All available hooks auto-generated from the API slices above:

**Authentication:**
- `useLoginMutation()` - Login user
- `useGetUserInfoQuery()` - Get current user info
- `useRegisterMutation()` - Register new user

**Transactions:**
- `useGetAllTransactionsQuery()` - Get all transactions grouped by year/month
- `useGetTransactionYearsQuery()` - Get years with transactions
- `useGetTransactionByIdQuery(id)` - Get single transaction
- `useGetTransactionListQuery({ pageIndex, pageSize })` - Paginated list
- `useAddTransactionMutation()` - Create transaction
- `useUpdateTransactionMutation()` - Update transaction
- `useDeleteTransactionMutation()` - Delete transaction
- `useDeleteTransactionListMutation()` - Batch delete
- `useFilterTransactionsByYearMutation()` - Filter by year/month/type

**Account Balances (Totals):**
- `useGetTotalsQuery()` - Get all account balances
- `useUpdateTotalsMutation()` - Update account balances
- `useGetTotalsByDescriptionQuery(year?)` - Get totals grouped by category

**Descriptions:**
- `useGetDescriptionsQuery(withOccurrences?)` - Get transaction categories
- `useUpdateDescriptionMutation()` - Update description
- `useDeleteDescriptionMutation()` - Delete description

Each hook automatically provides:
- `data` - Response data
- `isLoading` - Loading state
- `isError` - Error state
- `error` - Error details
- `isSuccess` - Success state
- `refetch()` - Manual refetch function
- For mutations: `.unwrap()` for promise-based error handling

**2.3 Update Redux Store Configuration**

Update the store to include RTK Query (`store/index.ts`):
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Create typed hooks (`store/hooks.ts`):
```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

Create Auth Slice (`store/slices/authSlice.ts`):
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  person_id: number;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

Wrap app with Redux Provider (`app/layout.tsx` or `_app.tsx`):
```typescript
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
```

**2.5 Create Login Page with RTK Query (`app/(auth)/login/page.tsx`)**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/slices/authSlice';

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Campo obbligatorio'),
  password: z.string().min(1, 'Password obbligatoria'),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await login(data).unwrap();

      // Decode JWT to get user info (or call /user-info endpoint)
      dispatch(loginSuccess({
        token: result.token,
        user: {/* decoded user info */}
      }));

      toast({
        title: "Accesso effettuato",
        description: "Login completato con successo",
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Credenziali non valide",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username o Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
```

**Key Features:**
- ✅ Uses `useLoginMutation` from RTK Query
- ✅ Automatic loading state from RTK Query
- ✅ Dispatches to Redux slice on success
- ✅ Toast notifications with shadcn/ui Toast
- ✅ Type-safe with Zod validation

---

### Step 3: Dashboard Implementation

**3.1 Create Dashboard Layout**
- Navbar with responsive mobile menu
- User profile dropdown
- Protected route wrapper
- Main content area

**3.2 Transaction Components**
- `TransactionList` - Display transactions grouped by year/month
- `TransactionAccordion` - Expandable transaction groups
- `TransactionTable` - Tabular view with sorting
- `AddTransactionModal` - Create new transaction
- `EditTransactionModal` - Update transaction
- `DeleteTransactionModal` - Confirm deletion
- `TransactionFilters` - Filter by date, description, type

**3.3 Account Balance Components**
- `TotalsCard` - Display account balances
- `UpdateTotalsModal` - Edit account balances

**3.4 Using RTK Query in Components**

Example: Dashboard component using RTK Query hooks:
```typescript
'use client';

import { useGetAllTransactionsQuery, useAddTransactionMutation } from '@/store/api/transactionsApi';
import { useGetTotalsQuery } from '@/store/api/totalsApi';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { toast } = useToast();

  // Fetch transactions (automatic caching, refetching)
  const { data: transactions, isLoading, isError } = useGetAllTransactionsQuery();

  // Fetch account totals
  const { data: totals } = useGetTotalsQuery();

  // Mutation for adding transaction
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();

  const handleAddTransaction = async (transaction: TransactionInput) => {
    try {
      await addTransaction(transaction).unwrap();
      // RTK Query automatically refetches related data (transactions, totals)
      toast({
        title: "Successo",
        description: "Transazione aggiunta con successo",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Impossibile aggiungere la transazione",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading transactions</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render transactions and totals */}
    </div>
  );
}
```

**Key RTK Query Benefits:**
- ✅ **Automatic caching** - No manual cache management
- ✅ **Auto refetching** - Smart invalidation when mutations run
- ✅ **Loading/error states** - Built-in from hooks
- ✅ **TypeScript inference** - Full type safety
- ✅ **Optimistic updates** - Easy to implement
- ✅ **Redux DevTools** - See all API calls and cache state

**Note on Notifications (Updated for 2025):**

shadcn/ui now uses **Sonner** as the official toast component (the old `toast` component is deprecated).

Add the `<Toaster />` component from Sonner to your layout:
```typescript
// components/providers.tsx (or app/layout.tsx)
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
```

Usage in components:
```typescript
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast('Info message');
```

---

### Step 4: Component Mapping (Angular → React)

| Angular Component | React Component | Notes |
|-------------------|-----------------|-------|
| `DashboardComponent` | `app/(dashboard)/dashboard/page.tsx` | Page component |
| `HomeHeaderComponent` | `components/dashboard/DashboardHeader.tsx` | React component |
| `HomeContentComponent` | `components/dashboard/DashboardContent.tsx` | React component |
| `NewTransactionModalComponent` | `components/transactions/AddTransactionDialog.tsx` | Use shadcn Dialog |
| `TransactionsByYearTableComponent` | `components/transactions/TransactionsByYear.tsx` | Use shadcn Table |
| `AccordionItemTransactionsComponent` | `components/transactions/TransactionAccordion.tsx` | Use shadcn Accordion |
| `DatepickerComponent` | `components/ui/DateRangePicker.tsx` | Use shadcn Calendar + Popover |
| `ElencoMovimentiComponent` | `app/(dashboard)/transactions/list/page.tsx` | Transaction list page |
| `ContabilitaAnnualeComponent` | `app/(dashboard)/transactions/annual-report/page.tsx` | Annual accounting page |
| `ManageDescriptionsComponent` | `app/(dashboard)/settings/descriptions/page.tsx` | Description management page |
| `NavbarComponent` | `components/layout/Navbar.tsx` | Layout component |
| `UserInfoModalComponent` | `components/layout/UserProfileDialog.tsx` | Use shadcn Dialog |

---

### Step 5: Styling & Design System

**5.1 Tailwind Configuration (`tailwind.config.ts`)**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette (2025/26 modern design)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

**5.2 Global Styles (`styles/globals.css`)**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* ... more CSS variables */
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .container-custom {
    @apply container mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

---

## Modern Design System (2025/26)

### Design Principles

1. **Minimal & Clean** - Remove unnecessary visual elements
2. **Functional First** - Focus on usability and clarity
3. **Mobile-First** - Design for mobile, enhance for desktop
4. **Accessible** - WCAG 2.1 AA compliance
5. **Performance** - Optimize for speed (Core Web Vitals)

### Color Palette (Modern)

**Primary Colors:**
- **Primary Blue:** `#3b82f6` (Bright, modern blue)
- **Primary Dark:** `#1e3a8a` (Deep navy)
- **Secondary Orange:** `#f97316` (Vibrant orange)
- **Accent Green:** `#10b981` (Success green)

**Neutral Colors:**
- **Background:** `#ffffff` / `#0f172a` (dark mode)
- **Surface:** `#f8fafc` / `#1e293b` (dark mode)
- **Text Primary:** `#0f172a` / `#f1f5f9` (dark mode)
- **Text Secondary:** `#64748b` / `#94a3b8` (dark mode)

**Semantic Colors:**
- **Success:** `#10b981`
- **Warning:** `#f59e0b`
- **Error:** `#ef4444`
- **Info:** `#3b82f6`

### Typography

**Font Family:** Inter (modern, highly legible)

```css
/* Headings */
h1: 2.25rem (36px), font-weight: 700
h2: 1.875rem (30px), font-weight: 600
h3: 1.5rem (24px), font-weight: 600
h4: 1.25rem (20px), font-weight: 500

/* Body */
body: 1rem (16px), font-weight: 400
small: 0.875rem (14px), font-weight: 400
```

### Layout & Spacing

**Container Max Width:** 1280px
**Spacing Scale:** 4px base (0.25rem increments)
**Border Radius:** 0.5rem (8px) standard, 0.75rem (12px) large
**Shadows:** Soft, subtle elevation

### Components Design

**Cards:**
- White background with subtle border
- Soft shadow on hover
- 12px border radius
- Generous padding (24px)

**Buttons:**
- Primary: Solid fill with hover state
- Secondary: Outline with hover fill
- Ghost: Transparent with hover background
- Heights: sm (32px), md (40px), lg (48px)

**Forms:**
- Clear labels above inputs
- Subtle borders with focus state
- Inline validation messages
- Disabled state with reduced opacity

**Tables:**
- Striped rows for readability
- Hover state on rows
- Sticky header on scroll
- Responsive (horizontal scroll on mobile)

**Modals/Dialogs:**
- Centered with backdrop blur
- Smooth enter/exit animations
- Mobile: Full screen on small devices
- Desktop: Max-width 600px

### Landing Page Design (New)

**Hero Section:**
- Full-height hero with gradient background
- Clear value proposition
- Primary CTA (Get Started / Register)
- Modern illustration or screenshot

**Features Section:**
- 3-column grid (desktop) / 1-column (mobile)
- Icon + Title + Description
- Highlight key features: Track expenses, Visualize trends, Multiple accounts

**How It Works Section:**
- Step-by-step process (1-2-3)
- Visual indicators
- Simple, clear descriptions

**Screenshots Section:**
- Carousel or grid of app screenshots
- Showcase dashboard, charts, mobile view

**CTA Section:**
- Secondary call-to-action
- Social proof (if applicable)
- Link to registration

**Footer:**
- Links: Privacy, Terms, Contact
- Social media icons
- Copyright notice

### Mobile Optimization

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-Specific Considerations:**
- Hamburger menu for navigation
- Bottom sheet for modals (instead of centered)
- Touch-friendly tap targets (min 44px)
- Swipeable transaction cards
- Pull-to-refresh for lists
- Sticky "Add Transaction" FAB

---

## Technical Decisions

### Decision Matrix

| Decision | Option A | Option B | Recommendation | Rationale |
|----------|----------|----------|----------------|-----------|
| **State Management** | Redux Toolkit | Zustand | **Redux Toolkit** | Familiar to NgRx users, all-in-one with RTK Query |
| **API Calls** | RTK Query | React Query | **RTK Query** | Integrated with Redux, auto-caching, familiar patterns |
| **Forms** | React Hook Form | Formik | **React Hook Form** | Better performance, smaller bundle, TypeScript support |
| **Validation** | Zod | Yup | **Zod** | Type-safe, composable, better DX |
| **Charts** | Recharts | Chart.js | **Recharts** | React-native, declarative, easier customization |
| **Date Library** | date-fns | Day.js | **date-fns** | Tree-shakable, immutable, TypeScript support |
| **Notifications** | shadcn/ui Toast | Sonner | **shadcn/ui Toast** | Integrated with UI system, no extra dependency |
| **UI Components** | shadcn/ui | MUI | **shadcn/ui** | Customizable, no runtime overhead, modern |
| **Styling** | Tailwind CSS | CSS Modules | **Tailwind CSS** | Faster development, consistent design, great DX |
| **Package Manager** | Yarn 4 | npm / pnpm | **Yarn 4** | Faster, PnP support, workspace support |
| **Version Management** | Volta | nvm | **Volta** | Automatic, team consistency via package.json |
| **Authentication** | NextAuth.js | Custom JWT | **Custom JWT** | Backend already has JWT, simpler integration |
| **Deployment** | Vercel | AWS Amplify | **Vercel** | Optimized for Next.js, easy setup, excellent DX |

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://ugres4ki37.execute-api.eu-south-1.amazonaws.com/production/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Google OAuth (if needed)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Feature Parity** | High | Medium | Create comprehensive feature checklist, test against old app |
| **Data Loss** | High | Low | Backend unchanged, thorough testing |
| **User Adoption** | Medium | Low | Keep familiar UI patterns, provide training/guide |
| **Mobile Bugs** | Medium | Medium | Extensive mobile testing on real devices |
| **Performance Issues** | Medium | Low | Use Lighthouse, Web Vitals, optimize images |
| **Browser Compatibility** | Low | Low | Test on Chrome, Firefox, Safari, Edge |
| **OAuth Migration** | Medium | Medium | Test Google OAuth thoroughly |
| **Accessibility Issues** | Medium | Low | Use semantic HTML, ARIA labels, keyboard navigation |

---

## Timeline & Milestones

### Detailed Timeline (10 Weeks)

**Week 1: Project Setup & Foundation** ✅ COMPLETED
- [x] Create Next.js project (16.1.0 with Turbopack)
- [x] Install dependencies (Yarn 4.5.1 via Volta)
- [x] Set up TypeScript config (5.x)
- [x] Configure ESLint & Prettier
- [x] Set up Git repository
- [x] Create base layout structure
- [x] Configure environment variables (.env.local, .env.example)

**Week 2: Authentication** ✅ COMPLETED
- [x] API client setup (RTK Query base API slice)
- [x] Auth store (Redux Toolkit + Auth slice)
- [x] Login page UI (with form validation)
- [x] Registration page UI (with password confirmation)
- [x] JWT token management (decode utility + localStorage)
- [x] Protected route middleware (ProtectedRoute component)

**Week 3: Dashboard - Part 1** ✅ COMPLETED
- [x] Dashboard layout (with ProtectedRoute)
- [x] Navbar component (responsive with mobile menu)
- [x] User profile dropdown (with logout)
- [x] Account totals display (DashboardHeader with cards)
- [ ] Transaction filters component (pending)

**Week 4: Dashboard - Part 2** ✅ COMPLETED
- [x] Transaction list component (accordion view with year/month grouping)
- [x] Add transaction modal (full form with validation)
- [X] Edit transaction modal
- [X] Delete transaction modal
- [x] RTK Query integration (all API endpoints configured)

**Week 5: Dashboard - Part 3** ✅ COMPLETED
- [x] Transaction accordion (nested year/month/description grouping)
- [X] Update totals functionality
- [x] Date range picker (Calendar component in Add Transaction)
- [X] Filters integration
- [X] Polish dashboard UI

**Week 6: Transactions Module**
- [X] Transaction list page (paginated)
- [X] Annual accounting/report page
- [X] Chart integration (Recharts)
- [X] Trend analysis page
- [ ] Export functionality (if needed)

**Week 7: Settings & Admin**
- [ ] Description/category management page
- [ ] Update/delete descriptions
- [ ] Admin user list page
- [ ] User detail modal
- [ ] Delete user modal

**Week 8: Public Pages & OAuth** ⏳ PARTIALLY COMPLETED
- [x] New landing page design (hero, features, CTA sections)
- [ ] Privacy policy page
- [ ] Google OAuth integration
- [x] Footer component (included in landing page)
- [ ] 404 page

**Week 9: Mobile Optimization & Polish**
- [ ] Mobile navigation refinement
- [ ] Mobile transaction cards
- [ ] Touch gesture support
- [ ] Bottom sheet modals (mobile)
- [ ] FAB for add transaction (mobile)
- [ ] Responsive table/chart fixes

**Week 10: Testing & Deployment**
- [ ] Cross-browser testing
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Deploy to Vercel
- [ ] Final QA

---

## Feature Checklist (Migration Parity)

### Must-Have Features ✅

**Authentication:**
- [x] Login with username/email + password ✅
- [x] User registration with email verification ✅
- [x] JWT token management ✅
- [ ] Google OAuth login
- [x] Logout functionality ✅
- [ ] Remember me option

**Dashboard:**
- [x] View all transactions grouped by year/month ✅
- [x] Add new transaction (income, expense, withdrawal) ✅
- [x] Edit existing transaction ✅
- [x] Delete single transaction ✅
- [x] Delete multiple transactions ✅
- [x] Filter by date range ✅
- [x] Filter by description/category ✅
- [x] Filter by transaction type ✅
- [x] View account balances (totals) ✅
- [x] Update account balances ✅
- [x] Transaction accordion/expansion ✅

**Transactions Module:**
- [X] Paginated transaction list
- [X] Annual accounting view (chart + table)
- [X] Trend analysis with charts
- [ ] Export data (CSV/PDF if needed)

**Settings:**
- [ ] Manage transaction descriptions (categories)
- [ ] View description usage statistics
- [ ] Update description text
- [ ] Delete unused descriptions

**Administration (Admin Only):**
- [ ] View all users
- [ ] Edit user details
- [ ] Delete users
- [ ] User role management

**UI/UX:**
- [x] Responsive navbar with mobile menu ✅
- [x] User profile dropdown ✅
- [x] Toast notifications (Sonner via shadcn/ui) ✅
- [x] Loading states ✅
- [x] Error handling with user-friendly messages ✅
- [x] Italian language support ✅
- [x] Italian date format (dd/MM/yyyy with date-fns) ✅
- [x] EUR currency formatting ✅

### Nice-to-Have Features 🌟

- [ ] Dark mode toggle
- [ ] Transaction search
- [ ] Advanced filters (multiple criteria)
- [ ] Transaction attachments/receipts
- [ ] Recurring transactions
- [ ] Budget planning
- [ ] Savings goals
- [ ] Multi-currency support
- [ ] Data export (CSV, Excel, PDF)
- [ ] Print view
- [ ] Keyboard shortcuts
- [ ] Offline mode (PWA)

---

## Post-Migration Tasks

**1. User Acceptance Testing**
- Test all features with real user data
- Gather feedback from initial users
- Fix critical bugs

**2. Performance Optimization**
- Run Lighthouse audits
- Optimize images (WebP, lazy loading)
- Code splitting optimization
- Bundle size analysis

**3. SEO Optimization**
- Add meta tags
- Create sitemap.xml
- Add robots.txt
- Implement structured data

**4. Documentation**
- User guide
- Developer documentation
- API integration guide
- Deployment guide

**5. Monitoring & Analytics**
- Set up error tracking (Sentry)
- Add analytics (Google Analytics / Plausible)
- Performance monitoring
- User behavior tracking

---

## Version Reference & Package Details (December 2025)

### Core Technologies - Exact Versions

| Technology | Version | Release Date | Notes |
|------------|---------|--------------|-------|
| **Node.js** | 24.12.0 LTS | Dec 2025 | Current LTS, production-ready |
| **Yarn** | 4.5.1+ (Berry) | Dec 2025 | Modern package manager via Corepack |
| **Next.js** | 16.2+ | Dec 2025 | Turbopack stable in production |
| **React** | 19.2.1 | Nov 2025 | Stable with React Compiler |
| **React DOM** | 19.2.1 | Nov 2025 | Matches React version |
| **TypeScript** | 5.9.3 | Dec 2025 | Latest with decorator metadata |

### UI & Styling - Exact Versions

| Technology | Version | Notes |
|------------|---------|-------|
| **Tailwind CSS** | 4.2.1 | Oxide engine (Rust), stable v4 |
| **PostCSS** | 8.5+ | CSS processor |
| **Autoprefixer** | 10.4+ | CSS vendor prefixing |
| **shadcn/ui** | Latest (CLI-based) | Component library (not npm package) |
| **lucide-react** | 0.550+ | Icons (auto-installed by shadcn init) |
| **class-variance-authority** | 0.8+ | Variants (auto-installed by shadcn init) |
| **clsx** | 2.2+ | Conditional classes (auto-installed by shadcn init) |
| **tailwind-merge** | 3.0+ | Merge Tailwind (auto-installed by shadcn init) |

**Note:** Radix UI packages are installed automatically by `shadcn add <component>` - don't install manually!

### State Management & Data Fetching

| Technology | Version | Purpose |
|------------|---------|---------|
| **Redux Toolkit** | 2.5.0+ | All-in-one: state + API (includes RTK Query) |
| **React Redux** | 9.2.0+ | React bindings for Redux |

**Note:** RTK Query is included in Redux Toolkit - no separate installation needed for API calls!

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Hook Form** | 7.55.0+ | Form state management |
| **@hookform/resolvers** | 3.10.0+ | Schema resolver for RHF |
| **Zod** | 3.25.2+ | TypeScript-first validation |

### Date & Time

| Technology | Version | Purpose |
|------------|---------|---------|
| **date-fns** | 4.2.0+ | Modern date utility (tree-shakable) |

### Charts & Visualization

| Technology | Version | Purpose |
|------------|---------|---------|
| **Recharts** | 3.6.0+ | React charts library (v3 stable) |

### Utilities

| Technology | Version | Purpose |
|------------|---------|---------|
| **lodash-es** | 4.17.21 | ES module utilities |
| **@types/lodash-es** | 4.17.x | TypeScript types |

### Development Dependencies

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 10.x | JavaScript/TypeScript linting |
| **eslint-config-next** | 16.x | Next.js ESLint config |
| **Prettier** | 4.x | Code formatting |
| **@types/node** | ^24.x | Node.js TypeScript types |
| **@types/react** | ^19.x | React TypeScript types |
| **@types/react-dom** | ^19.x | React DOM TypeScript types |

---

### Example package.json (December 2025)

```json
{
  "name": "my-accounting-fe",
  "version": "2.0.0",
  "private": true,
  "packageManager": "yarn@4.5.1",
  "volta": {
    "node": "24.12.0",
    "yarn": "4.5.1"
  },
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\""
  },
  "dependencies": {
    "next": "^16.2.0",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "typescript": "^5.9.3",
    "@reduxjs/toolkit": "^2.5.0",
    "react-redux": "^9.2.0",
    "react-hook-form": "^7.55.0",
    "@hookform/resolvers": "^3.10.0",
    "zod": "^3.25.2",
    "date-fns": "^4.2.0",
    "recharts": "^3.6.0",
    "lodash-es": "^4.17.21",
    "class-variance-authority": "^0.8.0",
    "clsx": "^2.2.0",
    "tailwind-merge": "^3.0.0",
    "lucide-react": "^0.550.0"
  },
  "devDependencies": {
    "@types/node": "^24.12.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@types/lodash-es": "^4.17.15",
    "eslint": "^10.5.0",
    "eslint-config-next": "^16.2.0",
    "prettier": "^4.1.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^4.2.1",
    "autoprefixer": "^10.4.20"
  }
}
```

**Key Notes:**
- ✅ Added `"volta"` field for automatic Node.js 24.12.0 and Yarn 4.5.1 version management
- ✅ Core UI utilities (clsx, tailwind-merge, lucide-react) installed by `npx shadcn init`
- ✅ Radix UI packages (@radix-ui/react-*) installed automatically by `npx shadcn add <component>`
- ✅ Redux Toolkit includes RTK Query (no separate API library needed)
- ❌ No axios (RTK Query has built-in fetch)
- ❌ No React Query (using RTK Query instead)
- ❌ No Sonner (shadcn/ui includes Toast component)

**After running shadcn commands, your package.json will also include:**
- `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-toast`, etc.
- These are added automatically when you run `npx shadcn add dialog`, `npx shadcn add toast`, etc.

**Total Core Dependencies: Only 8 packages manually installed!**

---

### Version Verification Commands

After installation, verify all versions:

```bash
# Check Node.js and Yarn
node --version    # Expected: v24.12.0 or higher
yarn --version    # Expected: 4.5.1 or higher

# Check key package versions
yarn info next version
yarn info react version
yarn info typescript version

# Or list all dependencies
yarn list --pattern "next|react|typescript|@reduxjs/toolkit|react-redux"

# Expected versions:
# - next@16.2.x
# - react@19.2.1
# - typescript@5.9.3
# - @reduxjs/toolkit@2.5.x (includes RTK Query)
# - react-redux@9.2.x

# Check for outdated packages
yarn outdated

# Check for security vulnerabilities
yarn audit
```

---

### Key Changes from Angular 8 Project

| Old (Angular 8 - 2019) | New (Next.js 16 - 2025) | Reason |
|-------------------------|-------------------------|--------|
| Angular 8.2.4 | Next.js 16.x | Modern framework with better DX |
| Angular Material | shadcn/ui + Radix UI | Customizable, smaller bundle, accessible |
| NgRx (Redux) | Redux Toolkit + RTK Query | Modern Redux all-in-one, familiar patterns |
| Moment.js | date-fns | Tree-shakable, smaller (6x lighter) |
| Bootstrap 4 | Tailwind CSS 4 | Faster development, utility-first |
| RxJS Observables | RTK Query + Promises | Declarative API calls, auto-caching |
| HttpClient + Effects | RTK Query API slices | Automatic cache invalidation, less code |
| Karma + Jasmine | Vitest (Next.js built-in) | Faster, better TypeScript support |
| TSLint | ESLint 10 | TSLint deprecated in 2019 |
| Webpack | Turbopack (stable) | 10x faster builds |
| Angular CLI | Next.js CLI | Zero-config, better defaults |

---

### Compatibility & Migration Notes

**React 19.2 Considerations:**
- ✅ `forwardRef` no longer needed (ref is a prop)
- ✅ React Compiler is production-ready (auto-optimization)
- ✅ Server Actions stable and widely used
- ✅ `use()` hook for reading promises in render
- ⚠️ Legacy Context API slightly changed (minor)
- ⚠️ Deprecated lifecycle methods removed

**Next.js 16 New Features:**
- ✅ Turbopack is now stable for production builds
- ✅ Enhanced App Router with better streaming
- ✅ Improved middleware with edge runtime
- ✅ Better caching strategies (granular control)
- ✅ Partial Prerendering (PPR) stable
- ⚠️ Pages Router maintenance mode (still supported)

**TypeScript 5.9 Features:**
- ✅ Decorator metadata support (standard)
- ✅ Enhanced type inference for generics
- ✅ Better error messages with suggestions
- ✅ Faster compilation (~20% improvement)
- ✅ Improved satisfies operator

**Tailwind CSS 4.2:**
- ✅ Oxide engine (Rust-based, 10x faster)
- ✅ Native CSS cascade layers
- ✅ Zero-config (no tailwind.config.js needed for basics)
- ✅ Better dark mode support
- ⚠️ Some v3 classes deprecated (migration guide available)

**TanStack Query v6:**
- ✅ Better TypeScript inference
- ✅ Streaming support (React 19 compatible)
- ✅ Improved DevTools with AI suggestions
- ✅ Smaller bundle size
- ⚠️ Some v5 APIs changed (migration straightforward)

---

### Installation & Update Commands

**Initial Setup with Volta:**
```bash
# Volta is already installed, no need to install Node/Yarn manually!
# Volta will automatically use versions from package.json

# Create project
npx create-next-app@latest my-accounting-fe \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --turbopack

cd my-accounting-fe

# Add Volta configuration to package.json
# Add this to package.json:
# "volta": {
#   "node": "24.12.0",
#   "yarn": "4.5.1"
# }

# Install core dependencies (minimal set)
yarn add @reduxjs/toolkit react-redux react-hook-form @hookform/resolvers zod date-fns recharts lodash-es
yarn add -D @types/lodash-es

# Initialize shadcn/ui (installs: clsx, tailwind-merge, class-variance-authority, lucide-react)
npx shadcn@latest init

# Add UI components (each command automatically installs required Radix UI package)
npx shadcn@latest add button card dialog dropdown-menu form input label select table tabs toast calendar popover accordion avatar badge sheet
```

**What happens with each command:**
- `npx shadcn init` → Installs 4 core utilities (clsx, tailwind-merge, cva, lucide-react)
- `npx shadcn add dialog` → Installs `@radix-ui/react-dialog` + copies component code
- `npx shadcn add dropdown-menu` → Installs `@radix-ui/react-dropdown-menu` + copies component code
- And so on...

**What Volta Does:**
When you `cd` into the project, Volta reads the `package.json` and automatically:
- ✅ Uses Node.js 24.12.0
- ✅ Uses Yarn 4.5.1
- ✅ Ensures all team members use the same versions
- ✅ No manual switching needed

**Final Result:**
Only 10-15 npm packages instead of 30+ → cleaner, faster installs!

**Keeping Dependencies Updated:**
```bash
# Check for updates
yarn outdated

# Update all packages to latest (within semver range)
yarn up

# Update specific package to latest version
yarn up <package>@latest

# Update Next.js specifically
yarn up next@latest react@latest react-dom@latest

# Update dev dependencies
yarn up -D eslint@latest prettier@latest

# Upgrade all dependencies to latest
yarn upgrade-interactive

# Security audit
yarn audit
```

---

### Troubleshooting Common Issues

**Node.js/Yarn Version Issues (Volta):**
```bash
# Check if Volta is using correct versions
volta list

# Verify versions (should match package.json volta field)
node --version  # Should be v24.12.0
yarn --version  # Should be 4.5.1

# If versions don't match, ensure package.json has volta field:
# {
#   "volta": {
#     "node": "24.12.0",
#     "yarn": "4.5.1"
#   }
# }

# Then cd out and back in to reload Volta:
cd .. && cd my-accounting-fe

# Force Volta to install specific versions:
volta install node@24.12.0
volta install yarn@4.5.1
```

**Dependency Conflicts:**
```bash
# Clear Yarn cache
yarn cache clean

# Clear everything and reinstall
rm -rf node_modules .yarn/cache .pnp.* yarn.lock
yarn install

# Or force reinstall
yarn install --force
```

**TypeScript Errors:**
```bash
# Update TypeScript types
yarn add -D @types/node@latest @types/react@latest @types/react-dom@latest

# Clear TypeScript and Next.js cache
rm -rf .next tsconfig.tsbuildinfo
yarn build
```

**Turbopack Issues:**
```bash
# Fall back to Webpack if needed (remove --turbopack)
yarn dev

# Or in package.json, change:
"dev": "next dev"  # Instead of "next dev --turbopack"
```

**Yarn PnP Issues (if using Plug'n'Play):**
```bash
# Switch to node_modules mode (in .yarnrc.yml)
# Add: nodeLinker: node-modules

# Then reinstall
yarn install
```

---

### Useful Resources & Documentation

| Technology | Documentation | GitHub | Community |
|------------|---------------|--------|-----------|
| Next.js | https://nextjs.org/docs | https://github.com/vercel/next.js | Discord |
| React | https://react.dev | https://github.com/facebook/react | Reddit |
| TypeScript | https://www.typescriptlang.org | https://github.com/microsoft/TypeScript | Discord |
| Tailwind CSS | https://tailwindcss.com | https://github.com/tailwindlabs/tailwindcss | Discord |
| shadcn/ui | https://ui.shadcn.com | https://github.com/shadcn-ui/ui | Discord |
| TanStack Query | https://tanstack.com/query | https://github.com/TanStack/query | Discord |
| Zustand | https://zustand.docs.pmnd.rs | https://github.com/pmndrs/zustand | GitHub |
| Zod | https://zod.dev | https://github.com/colinhacks/zod | GitHub |
| Recharts | https://recharts.org | https://github.com/recharts/recharts | GitHub |

---

**Last Updated:** December 21, 2025
**Next Review:** Quarterly or when major releases occur
**Maintenance:** Check for updates monthly during active development

---

## Conclusion

This migration plan provides a comprehensive roadmap for rebuilding **my-accounting-fe** with modern technologies (Next.js 16, React 19, Tailwind CSS 4, shadcn/ui). The 10-week timeline is realistic for a full-featured application while maintaining feature parity with the Angular 8 version.

**Key Success Factors:**
1. Keep the backend API unchanged
2. Maintain familiar dashboard layout for user comfort
3. Modernize design for 2026 aesthetics (cutting-edge UI/UX)
4. Prioritize mobile experience (mobile-first approach)
5. Focus on performance and accessibility (Core Web Vitals, WCAG 2.1)
6. Leverage React 19 & Next.js 16 features (Server Components, Turbopack, React Compiler)
7. Test thoroughly before launch

**Next Steps:**
1. Review and approve this migration plan
2. Set up Node.js 24 LTS environment
3. Create Next.js 16 project with Turbopack (Week 1)
4. Begin authentication implementation (Week 2)
5. Iterate and gather feedback continuously

**Technology Benefits:**
- ⚡ **10x faster builds** with Turbopack (stable in Next.js 16)
- 🚀 **Automatic optimizations** with React 19 Compiler
- 📦 **Smaller bundle sizes** with modern tooling
- 🎨 **Faster styling** with Tailwind CSS 4 Oxide engine
- 🔥 **Better DX** with improved TypeScript 5.9 inference
- 🔄 **All-in-one state & API** with Redux Toolkit + RTK Query
- 🎯 **Volta version management** - automatic Node/Yarn versioning

**RTK Query Highlights:**
- ✅ **No separate HTTP library needed** (Axios removed)
- ✅ **Automatic caching & invalidation** - smart refetching
- ✅ **Familiar to NgRx users** - similar patterns, less boilerplate
- ✅ **Redux DevTools integration** - see all API calls and cache
- ✅ **TypeScript-first** - full type inference for all endpoints
- ✅ **Optimistic updates** - built-in support
- ✅ **Auto-generated hooks** - `useGetTransactionsQuery`, `useAddTransactionMutation`, etc.

---

**Document Status:** Ready for Implementation
**Approval Required:** Yes
**Estimated Effort:** 10 weeks (1 developer, full-time)
**Risk Level:** Low-Medium
**Target Start Date:** January 2026
**Target Completion:** March 2026
