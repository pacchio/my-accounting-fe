# My Accounting - Frontend

> Modern React/Next.js frontend for personal finance management

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2+-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Tech Stack

- **Framework:** Next.js 16.1.0 (App Router)
- **UI Library:** React 19.2+
- **Language:** TypeScript 5+
- **State Management:** Redux Toolkit
- **Data Fetching:** RTK Query
- **Styling:** TailwindCSS 3
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Date:** date-fns
- **Notifications:** Sonner

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── registration/
│   ├── (dashboard)/       # Protected pages
│   │   ├── admin/         # Admin panel
│   │   ├── dashboard/     # Main dashboard
│   │   ├── profile/       # User profile
│   │   ├── settings/      # Settings & categories
│   │   └── transactions/  # Transaction pages
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Landing page
│
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── layout/            # Layout components (Navbar, etc.)
│   ├── dashboard/         # Dashboard-specific components
│   ├── transactions/      # Transaction components
│   ├── settings/          # Settings components
│   └── admin/             # Admin components
│
├── store/
│   ├── api/               # RTK Query API slices
│   │   ├── apiSlice.ts
│   │   ├── authApi.ts
│   │   ├── transactionsApi.ts
│   │   ├── descriptionsApi.ts
│   │   ├── totalsApi.ts
│   │   └── adminApi.ts
│   ├── slices/            # Redux slices
│   │   └── authSlice.ts
│   └── index.ts
│
├── lib/
│   └── utils/             # Utility functions
│
└── types/                 # TypeScript type definitions
    ├── index.ts
    ├── transaction.ts
    ├── user.ts
    └── ...
```

---

## 🎨 Features

### Pages Implemented

- ✅ **Landing Page** - Marketing page with features
- ✅ **Login** - User authentication
- ✅ **Registration** - New user signup
- ✅ **Dashboard** - Financial overview with charts
- ✅ **Transactions List** - View all transactions with filters
- ✅ **Annual Accounting** - Yearly financial summary
- ✅ **Trend Analysis** - Spending trends over time
- ✅ **Settings** - User settings
- ✅ **Category Management** - CRUD for income/expense categories
- ✅ **Profile** - User profile view
- ✅ **Admin Panel** - User management (admin only)

### Key Components

- **Transaction Management:**
  - Add/Edit/Delete transactions
  - Filter by date, category, type
  - Pagination support
  - Real-time updates

- **Analytics:**
  - Pie charts for spending by category
  - Trend charts for monthly analysis
  - Annual accounting dashboard
  - Year-over-year comparisons

- **User Interface:**
  - Responsive design (mobile, tablet, desktop)
  - Dark mode support
  - Toast notifications
  - Loading states
  - Error handling

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build           # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run tests (if configured)
```

### Environment Variables

Create `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3002/api

# Optional: Analytics, etc.
```

---

## 🎯 State Management

### Redux Store Structure

```typescript
{
  auth: {
    token: string | null,
    user: User | null,
    isAuthenticated: boolean
  },
  
  api: {
    transactions: { ... },
    descriptions: { ... },
    totals: { ... },
    // RTK Query cache
  }
}
```

### API Integration (RTK Query)

```typescript
// Example usage
import { useGetTransactionsQuery } from '@/store/api/transactionsApi';

function TransactionList() {
  const { data, isLoading, error } = useGetTransactionsQuery({
    pageIndex: 0,
    pageSize: 50
  });
  
  // ...
}
```

---

## 🎨 Styling

### TailwindCSS

The project uses TailwindCSS with custom configuration:

```javascript
// tailwind.config.js
{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette
      }
    }
  }
}
```

### Shadcn/ui Components

UI components are from [Shadcn/ui](https://ui.shadcn.com/):

```bash
# Add new component
npx shadcn-ui@latest add button
```

Available components:
- Button, Input, Card, Dialog, Table
- Select, Checkbox, Radio, Switch
- Toast, Sheet, Dropdown Menu
- And more...

---

## 🔒 Authentication

### JWT Authentication Flow

1. User logs in → receives JWT token
2. Token stored in Redux + localStorage
3. Token sent in Authorization header for API requests
4. Middleware validates token on protected routes
5. Auto-redirect to login if token invalid/expired

### Protected Routes

Routes in `(dashboard)` group require authentication:
- Middleware checks auth state
- Redirects to `/login` if not authenticated

---

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-First Approach

```tsx
<div className="
  grid grid-cols-1        // Mobile: 1 column
  md:grid-cols-2          // Tablet: 2 columns
  lg:grid-cols-3          // Desktop: 3 columns
">
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel
   ```

2. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The app can be deployed to:
- Netlify
- AWS Amplify
- Self-hosted with Docker

---

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Next.js (`next.config.ts`)
- App Router enabled
- Image optimization configured
- API proxy setup

### ESLint (`.eslintrc.json`)
- Next.js recommended rules
- TypeScript support
- Custom rules for code quality

---

## 📊 Performance

### Optimizations Applied

- ✅ **Code Splitting** - Automatic with Next.js
- ✅ **Image Optimization** - Next.js Image component
- ✅ **React Memoization** - memo(), useMemo(), useCallback()
- ✅ **API Caching** - RTK Query cache management
- ✅ **Bundle Optimization** - Tree shaking, minification
- ✅ **Font Optimization** - Next.js font system

---

## 🐛 Debugging

### Development Tools

```bash
# Enable React DevTools
# Enable Redux DevTools

# View API calls in browser DevTools > Network tab
# Check console for errors and warnings
```

### Common Issues

**API Connection Failed:**
- Check backend is running on port 3002
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

**Authentication Issues:**
- Clear localStorage
- Check JWT token validity
- Verify backend authentication endpoint

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)

---

## 🤝 Contributing

See main [README.md](../README.md) for contribution guidelines.

---

**Version:** 2.0.0  
**Last Updated:** January 2026

