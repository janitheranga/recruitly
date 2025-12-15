"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  X,
  SlidersVertical,
  LogOut,
  Settings,
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
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Statistics", href: "/dashboard/statistics", icon: BarChart3 },
  { name: "Applicants", href: "/dashboard/applicants", icon: Users },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleGradientHover =
    "linear-gradient(135deg, var(--color-dark-amethyst-200), var(--color-indigo-velvet-100))";
  const activeGradient =
    "linear-gradient(135deg, var(--color-dark-amethyst-400), var(--color-indigo-velvet-600))";

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const targetPage = navigation.find(
      (page) => page.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (targetPage) {
      router.push(targetPage.href);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const exactMatch = navigation.some(
    (page) => page.name.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  // Filter navigation pages based on search query, but hide when it's an exact match
  const filteredSuggestions =
    searchQuery.trim() && !exactMatch
      ? navigation.filter((page) =>
          page.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const handleSelectSuggestion = (page: (typeof navigation)[0]) => {
    setSearchQuery(page.name);
    router.push(page.href);
  };
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
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Middle - Search Bar */}
          <div className="flex-1 max-w-md relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
              <Input
                placeholder="Search jobs, candidates, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-10 bg-dust-grey-50 border-[var(--color-honeydew-200)] focus:ring-[var(--color-honeydew-300)] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-dust-grey-200 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-dust-grey-500 cursor-pointer" />
                </button>
              )}

              {/* Suggestions Dropdown */}
              {filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-dust-grey-200 max-h-96 overflow-y-auto z-50">
                  {filteredSuggestions.map((page) => (
                    <button
                      key={page.href}
                      onClick={() => handleSelectSuggestion(page)}
                      className="w-full text-left px-4 py-3 hover:bg-honeydew-50 transition-colors flex items-center gap-3 text-sm border-b border-dust-grey-100 last:border-b-0"
                    >
                      <page.icon className="h-5 w-5 text-dust-grey-600 flex-shrink-0" />
                      <span className="text-dust-grey-900 font-medium">
                        {page.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Notifications & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 hover:bg-dust-grey-100 rounded-lg cursor-pointer"
                >
                  <Bell className="h-5 w-5 text-dust-grey-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-honeydew-500" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80"
                style={{ background: "white" }}
              >
                <div className="px-4 py-3 border-b border-dust-grey-200">
                  <h3 className="font-semibold text-dust-grey-900">
                    Notifications
                  </h3>
                  <p className="text-xs text-dust-grey-600 mt-1">
                    You have 3 unread notifications
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-honeydew-50 flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-honeydew-500 shrink-0" />
                      <p className="font-medium text-sm text-dust-grey-900 flex-1">
                        New job application received
                      </p>
                      <span className="text-xs text-dust-grey-500">2m ago</span>
                    </div>
                    <p className="text-xs text-dust-grey-600 ml-4">
                      Sarah Martinez applied for Senior Frontend Developer
                    </p>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-honeydew-50 flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-honeydew-500 shrink-0" />
                      <p className="font-medium text-sm text-dust-grey-900 flex-1">
                        Interview scheduled
                      </p>
                      <span className="text-xs text-dust-grey-500">1h ago</span>
                    </div>
                    <p className="text-xs text-dust-grey-600 ml-4">
                      Alex Kumar - Tomorrow at 2:00 PM
                    </p>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-honeydew-50 flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-honeydew-500 shrink-0" />
                      <p className="font-medium text-sm text-dust-grey-900 flex-1">
                        Candidate shortlisted
                      </p>
                      <span className="text-xs text-dust-grey-500">3h ago</span>
                    </div>
                    <p className="text-xs text-dust-grey-600 ml-4">
                      John Smith moved to final round
                    </p>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-dust-grey-50 flex flex-col items-start gap-1 opacity-60">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-transparent border border-dust-grey-300 shrink-0" />
                      <p className="font-medium text-sm text-dust-grey-700 flex-1">
                        Job posting published
                      </p>
                      <span className="text-xs text-dust-grey-500">1d ago</span>
                    </div>
                    <p className="text-xs text-dust-grey-600 ml-4">
                      Backend Engineer position is now live
                    </p>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-dust-grey-50 flex flex-col items-start gap-1 opacity-60">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-transparent border border-dust-grey-300 shrink-0" />
                      <p className="font-medium text-sm text-dust-grey-700 flex-1">
                        Team member added
                      </p>
                      <span className="text-xs text-dust-grey-500">2d ago</span>
                    </div>
                    <p className="text-xs text-dust-grey-600 ml-4">
                      Emma Wilson joined the recruitment team
                    </p>
                  </DropdownMenuItem>
                </div>

                <div className="px-4 py-3 border-t border-dust-grey-200">
                  <button className="text-sm text-honeydew-600 hover:text-honeydew-700 font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
                className="w-56 p-2.5"
                style={{
                  background: "white",
                }}
              >
                <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-(--color-honeydew-100) flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-(--color-honeydew-100) flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-(--color-honeydew-100) flex items-center">
                  <SlidersVertical className="h-4 w-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer px-4 py-3 text-red-600 hover:bg-(--color-honeydew-100) flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
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
                    "flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all cursor-pointer group",
                    sidebarOpen ? "" : "justify-center px-0",
                    isActive
                      ? "text-white font-semibold shadow-md bg-(--color-dark-amethyst-400) hover:bg-(--color-dark-amethyst-500)"
                      : "text-black hover:shadow hover:bg-(--color-honeydew-200)"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-black group-hover:text-black"
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
