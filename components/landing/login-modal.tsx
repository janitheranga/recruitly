"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate credentials
    router.push("/dashboard");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-dust-grey-100:bg-indigo-velvet-700 rounded-lg"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-gradient mb-3">
                Welcome Back
              </h2>
              <p className="text-dust-grey-600 mb-8">
                Sign in to continue your recruitment journey
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-dust-grey-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-dust-grey-300 bg-white text-dust-grey-900 focus:outline-none focus:ring-2 focus:ring-honeydew-500 smooth-transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dust-grey-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-dust-grey-300 bg-white text-dust-grey-900 focus:outline-none focus:ring-2 focus:ring-honeydew-500 smooth-transition"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <Button
                  type="submit"
                  className="w-full cursor-pointer gradient-primary text-white font-semibold py-4 shadow-glow hover:shadow-glow-lg smooth-transition text-lg"
                >
                  Sign In
                </Button>
              </motion.div>

              <p className="text-center text-dust-grey-600 mt-6">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-gradient hover:opacity-80 smooth-transition"
                >
                  Sign up for free
                </button>
              </p>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
