import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet, PieChart, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200/50 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">My Accounting</span>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/registration">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30"></div>

        {/* Animated decorative elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse dark:from-blue-600/10 dark:to-indigo-600/10"></div>
        <div className="absolute -bottom-10 left-0 w-72 h-72 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse dark:from-purple-600/10 dark:to-pink-600/10"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Personal Finance Made Simple</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 pb-2 leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-indigo-200">
              Track Your Money,<br />Understand Your Spending
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              A clean, powerful tool to manage your personal finances. Track transactions across multiple accounts and visualize your financial data with beautiful charts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all">
                <Link href="/registration">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 border-2 hover:bg-gray-50 dark:hover:bg-gray-900">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">No hidden costs</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">Secure</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Encrypted data</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">Simple</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Easy to use</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-950 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              Simple, Powerful Finance Management
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to understand and control your money
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Feature 1 - Track & Organize */}
            <div className="group p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-2xl dark:hover:shadow-blue-900/30 transition-all duration-300 bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:scale-110 transition-transform shadow-xl">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Track & Organize</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Record all your income and expenses with custom categories. Manage multiple accounts and see your complete financial picture in one place.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span>Multiple account management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span>Custom categories & descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span>Detailed transaction notes</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 - Visualize & Analyze */}
            <div className="group p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-2xl dark:hover:shadow-indigo-900/30 transition-all duration-300 bg-gradient-to-br from-white via-indigo-50/20 to-white dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-900">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-110 transition-transform shadow-xl">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Visualize & Analyze</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Beautiful charts and reports that help you understand your spending patterns. Track trends and make informed financial decisions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">✓</span>
                  <span>Interactive pie charts by category</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">✓</span>
                  <span>Annual income vs expense breakdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">✓</span>
                  <span>Monthly trend analysis</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 - Monitor & Control */}
            <div className="group p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-2xl dark:hover:shadow-purple-900/30 transition-all duration-300 bg-gradient-to-br from-white via-purple-50/20 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 group-hover:scale-110 transition-transform shadow-xl">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Monitor & Control</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Stay on top of your finances with comprehensive dashboards. Filter by date, view historical data, and track your financial progress.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>Real-time balance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>Year-over-year comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>Detailed transaction history</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Start Managing Your Money Today
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Join users who have taken control of their finances. Free to use, easy to start, powerful to master.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 shadow-2xl hover:shadow-xl transition-all hover:scale-105">
            <Link href="/registration">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-blue-200">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link></li>
                <li><Link href="/transactions" className="hover:text-blue-600 dark:hover:text-blue-400">Transactions</Link></li>
                <li><Link href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400">Sign In</Link></li>
                <li><Link href="/registration" className="hover:text-blue-600 dark:hover:text-blue-400">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2026 My Accounting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
