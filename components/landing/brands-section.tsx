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
    <section className="py-16 sm:py-24 overflow-hidden">
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
