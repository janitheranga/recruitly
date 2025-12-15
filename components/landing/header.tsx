"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";

interface LandingHeaderProps {
  onLoginClick: () => void;
}

export function LandingHeader({ onLoginClick }: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/90/90 border-b border-(--color-dark-amethyst-200) shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ color: "var(--color-honeydew-600)" }}
                className="text-slate-600 transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onLoginClick}
                variant="ghost"
                size="sm"
                className="cursor-pointer smooth-transition"
              >
                <LogIn className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="cursor-pointer gradient-primary text-white shadow-glow smooth-transition hover:shadow-glow-lg"
                >
                  Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-slate-600 hover:bg-slate-100:bg-slate-800 rounded-lg"
              >
                {item.name}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
