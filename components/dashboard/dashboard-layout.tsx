"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Briefcase,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Statistics", href: "/statistics", icon: BarChart3 },
  { name: "Applicants", href: "/applicants", icon: Users },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleGradientHover =
    "linear-gradient(135deg, var(--color-dark-amethyst-200), var(--color-indigo-velvet-100))";
  const activeGradient =
    "linear-gradient(135deg, var(--color-dark-amethyst-400), var(--color-indigo-velvet-600))";
  return (
    <div className="min-h-screen bg-(--color-dark-amethyst-50) flex flex-col p-4">
      {/* Top Header - Logo & Navigation Bar */}
      <motion.header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border shadow-sm sticky top-0 z-30 rounded-xl"
      >
        <div className="px-6 py-4 flex items-center justify-between gap-6">
          {/* Left - Logo & Toggle */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>

          {/* Middle - Search Bar */}
          <div className="flex-1 max-w-md relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dust-grey-400" />
              <Input
                placeholder="Search jobs, candidates, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dust-grey-50 border-dust-grey-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Right - Notifications & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-dust-grey-100 rounded-lg cursor-pointer"
            >
              <Bell className="h-5 w-5 text-dust-grey-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-honeydew-500" />
            </motion.button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-dust-grey-100 rounded-lg cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(81.74% 0.163 128.60), oklch(70.96% 0.218 317.01))",
                    }}
                  >
                    JD
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-dust-grey-900">
                      John Doe
                    </p>
                    <p className="text-xs text-dust-grey-600">Admin</p>
                  </div>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56"
                style={{
                  background: "white",
                }}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      {/* Main Layout - Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: sidebarOpen ? 280 : 80 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-(--color-indigo-velvet-200) shadow-md overflow-hidden flex flex-col my-4 rounded-xl sticky top-25 self-start max-h-[calc(100vh-2rem)]"
        >
          {/* Toggle Button at Top */}
          <div className="p-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg cursor-pointer transition-all text-honeydew-900 hover:bg-(--color-honeydew-200)"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5 text-dust-grey-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-dust-grey-700" />
              )}
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all cursor-pointer group",
                    sidebarOpen ? "" : "justify-center px-0",
                    isActive
                      ? "text-white font-semibold shadow-md"
                      : "text-dust-grey-800 hover:text-dust-grey-900 hover:shadow hover:bg-(--color-honeydew-200)"
                  )}
                  style={isActive ? { background: activeGradient } : undefined}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-dust-grey-700 group-hover:text-dust-grey-900"
                    )}
                  />
                  {sidebarOpen && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Single Footer - Full Width */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white border p-6 text-center text-dust-grey-600 w-full my-4 rounded-xl"
      >
        <p>
          © {new Date().getFullYear()} Recruitly. All rights reserved. Built
          with care.
        </p>
      </motion.footer>
    </div>
  );
}
