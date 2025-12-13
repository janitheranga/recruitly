"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-lilac-ash-50 to-lilac-ash-100 dark:from-indigo-velvet-950 dark:to-indigo-velvet-900 flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        {/* 404 Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative w-40 h-40 mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-transparent border-t-honeydew-500 border-r-dark-amethyst-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold bg-linear-to-r from-honeydew-500 to-dark-amethyst-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative w-64 h-48 mx-auto"
        >
          <motion.div
            animate={{ float: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-linear-to-br from-honeydew-200/20 to-dark-amethyst-200/20 rounded-3xl"
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="cursor-pointer bg-honeydew-500 hover:bg-honeydew-600 text-slate-900"
              >
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </motion.div>
          </Link>

          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="cursor-pointer">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 text-center text-slate-600 dark:text-slate-400"
      >
        <p>© {new Date().getFullYear()} Recruitly. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
