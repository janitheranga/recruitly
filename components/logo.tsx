"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { icon: "h-8 w-8", text: "text-lg" },
    md: { icon: "h-10 w-10", text: "text-xl" },
    lg: { icon: "h-16 w-16", text: "text-3xl" },
  };

  const sizeValues = {
    sm: 32,
    md: 40,
    lg: 64,
  };

  return (
    <Link href="/">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 ${className}`}
      >
        <div
          className={`${sizes[size].icon} rounded-2xl p-0.5 shadow-lg overflow-hidden`}
          style={{
            background:
              "linear-gradient(135deg, oklch(77.63% 0.191 130.21) 0%, oklch(59.66% 0.293 313.57) 50%, oklch(51.60% 0.173 302.32) 100%)",
            boxShadow: "0 0 20px 4px rgba(206, 207, 99, 0.3)",
          }}
        >
          <motion.div
            className="h-full w-full rounded-[14px] flex items-center justify-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(77.63% 0.191 130.21) 0%, oklch(70.96% 0.218 317.01) 50%, oklch(51.60% 0.173 302.32) 100%)",
            }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top right, transparent, rgba(255, 255, 255, 0.2))",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Logo SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3/5 h-3/5 relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M12 2L4 6V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V6L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
                fillOpacity="0.9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M12 8L9 11L11 13L15 9"
                stroke="url(#gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="9" y1="8" x2="15" y2="13">
                  <stop offset="0%" stopColor="oklch(77.63% 0.191 130.21)" />
                  <stop offset="100%" stopColor="oklch(59.66% 0.293 313.57)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {showText && <span>Recruitly</span>}
      </motion.div>
    </Link>
  );
}
