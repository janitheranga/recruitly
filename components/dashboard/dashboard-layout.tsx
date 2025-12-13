"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  Briefcase,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Statistics", href: "/statistics", icon: BarChart3 },
  { name: "Applicants", href: "/applicants", icon: Users },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-r border-honeydew-200 overflow-hidden"
      >
        <div className="h-screen flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-honeydew-200">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="h-8 w-8 rounded-xl bg-linear-to-br from-honeydew-500 to-dark-amethyst-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold">R</span>
              </div>
              {sidebarOpen && (
                <span className="font-bold text-slate-900 whitespace-nowrap">
                  Recruitly
                </span>
              )}
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div key={item.name} whileHover={{ x: 5 }}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                      isActive
                        ? "bg-honeydew-100 text-honeydew-700"
                        : "text-slate-600 hover:bg-slate-100:bg-slate-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {sidebarOpen && (
                      <span className="font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-honeydew-200">
            <p className="text-xs text-slate-500 text-center">
              © {new Date().getFullYear()} Recruitly
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-honeydew-200 p-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100:bg-slate-800 rounded-lg cursor-pointer"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </motion.button>
        </motion.div>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-t border-honeydew-200 p-6 text-center text-slate-600"
        >
          <p>
            © {new Date().getFullYear()} Recruitly. All rights reserved. Built
            with care.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
