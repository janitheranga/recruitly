"use client";

import {
  Home,
  Briefcase,
  BarChart3,
  Users,
  Search,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Applicants Statistics", href: "/statistics", icon: BarChart3 },
  { name: "Explore Applicants Data", href: "/applicants", icon: Users },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredNavigation = navigation.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundColor: "var(--color-background)",
      }}
    >
      {/* Header - Full Width */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 gap-2 sm:gap-4">
          {/* Left Section: Mobile Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">
                Recruitly
              </span>
            </Link>
          </div>

          {/* Center Section: Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                if (filteredNavigation[0]) {
                  router.push(filteredNavigation[0].href);
                  setSearchQuery("");
                  setSearchFocused(false);
                }
              }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform duration-200" />
              <Input
                placeholder="Search sections..."
                className="pl-9 pr-3 transition-all duration-200 focus:shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
              />

              {searchQuery.trim().length > 0 && searchFocused && (
                <div className="absolute left-0 right-0 mt-2 origin-top rounded-xl border bg-(--color-background)/95 backdrop-blur shadow-xl transition-all duration-200 ease-out opacity-100 scale-100">
                  {filteredNavigation.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No matches
                    </div>
                  ) : (
                    <ul className="py-2">
                      {filteredNavigation.map((item) => (
                        <li key={item.href}>
                          <button
                            type="button"
                            className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              router.push(item.href);
                              setSearchQuery("");
                              setSearchFocused(false);
                            }}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right Section: Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-(--color-background)/95"
              >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 w-full min-w-0">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
