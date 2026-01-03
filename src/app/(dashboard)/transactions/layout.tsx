'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { List, PieChart, TrendingUp } from 'lucide-react';

const navItems = [
  {
    title: 'Elenco Movimenti',
    href: '/transactions/list',
    icon: List,
  },
  {
    title: 'Contabilità Annuale',
    href: '/transactions/annual-accounting',
    icon: PieChart,
  },
  {
    title: 'Andamento',
    href: '/transactions/trend',
    icon: TrendingUp,
  },
];

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-20 space-y-1 rounded-lg border bg-card p-4 hidden md:block">
          <h2 className="mb-4 px-2 text-lg font-semibold">Transazioni</h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile: Horizontal tabs */}
        <div className="flex justify-center gap-2 overflow-x rounded-lg border bg-card p-2 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 whitespace-nowrap rounded-md px-4 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

