"use client";

import { motion } from "motion/react";
import { Globe, Zap, Rocket, Cloud, Database, Lightbulb } from "lucide-react";

const brands = [
  {
    name: "TechCorp",
    icon: Globe,
    gradient:
      "linear-gradient(135deg, oklch(81.74% 0.163 128.60), oklch(65.83% 0.160 130.08))",
  },
  {
    name: "InnovateLabs",
    icon: Lightbulb,
    gradient:
      "linear-gradient(135deg, oklch(64.01% 0.270 315.85), oklch(50.62% 0.247 313.83))",
  },
  {
    name: "FutureWorks",
    icon: Rocket,
    gradient:
      "linear-gradient(135deg, oklch(61.12% 0.138 304.15), oklch(44.11% 0.144 302.38))",
  },
  {
    name: "CloudSys",
    icon: Cloud,
    gradient:
      "linear-gradient(135deg, oklch(77.63% 0.191 130.21), oklch(59.66% 0.293 313.57))",
  },
  {
    name: "DataFlow",
    icon: Database,
    gradient:
      "linear-gradient(135deg, oklch(70.96% 0.218 317.01), oklch(51.60% 0.173 302.32))",
  },
  {
    name: "StartupHub",
    icon: Zap,
    gradient:
      "linear-gradient(135deg, oklch(81.74% 0.163 128.60), oklch(50.62% 0.247 313.83))",
  },
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
      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-20"
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
          className="text-center text-dust-grey-600 mb-12 font-semibold uppercase tracking-wider"
        >
          Trusted by leading companies
        </motion.p>

        <div className="relative overflow-hidden py-4">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
            className="flex gap-8 w-max"
          >
            {[...brands, ...brands].map((brand, index) => {
              const Icon = brand.icon;
              return (
                <motion.div
                  key={index}
                  className="shrink-0"
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className="px-8 py-6 rounded-xl bg-white border border-dust-grey-200 shadow-md hover:shadow-glow smooth-transition flex flex-col items-center gap-4 min-w-48">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{ background: brand.gradient }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-dust-grey-900 text-center whitespace-nowrap">
                      {brand.name}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
