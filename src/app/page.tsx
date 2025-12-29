import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet, TrendingUp, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Wallet className="h-10 w-10" />
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            My Accounting
          </h1>
          <p className="mb-8 text-xl text-blue-100 sm:text-2xl">
            Manage your personal finances with ease
          </p>
          <p className="mb-12 text-lg text-blue-100">
            Track income, expenses, and transfers between accounts. View detailed reports and take control of your money.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/registration">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools to manage your personal finances
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                <Wallet className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Transactions</h3>
              <p className="text-muted-foreground">
                Record income, expenses, and transfers between accounts in seconds
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">View Reports</h3>
              <p className="text-muted-foreground">
                Annual and monthly reports with detailed charts to analyze your spending
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Monitor Balance</h3>
              <p className="text-muted-foreground">
                Keep track of your account balances and total balance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Create your free account and start managing your finances today
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link href="/registration">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 My Accounting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
