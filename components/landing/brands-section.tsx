"use client";

import { motion } from "motion/react";

const brands = [
  "TechCorp",
  "InnovateLabs",
  "FutureWorks",
  "CloudSys",
  "DataFlow",
  "StartupHub",
];

export function BrandsSection() {
  return (
    <section
      className="py-16 sm:py-24 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(98.0% 0.001 0) 0%, oklch(95.95% 0.003 308.43) 100%)",
      }}
    >
      {/* Dark mode gradient background */}
      <div
        className="absolute inset-0 dark:block hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(16.35% 0.034 302.99) 0%, oklch(19.20% 0.047 304.43) 100%)",
        }}
      />
      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          background:
            "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.15) 0px, transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-dust-grey-600 dark:text-dust-grey-400 mb-12 font-semibold uppercase tracking-wider"
        >
          Trusted by leading companies
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
            className="flex gap-16"
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="shrink-0 px-8 py-6 rounded-lg bg-white dark:bg-indigo-velvet-800 border border-dust-grey-200 dark:border-indigo-velvet-700/30"
              >
                <p className="font-semibold text-dust-grey-900 dark:text-white whitespace-nowrap">
                  {brand}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
