"use client";

import { motion } from "motion/react";
import { Users, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "AI-Powered Matching",
    description:
      "Intelligent candidate matching using advanced algorithms to find your perfect team members.",
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    description:
      "Seamless team collaboration with real-time updates and instant notifications.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive insights and metrics to optimize your hiring strategy.",
  },
];

export function FeaturesSection() {
  const gradientStyles = {
    accent:
      "linear-gradient(135deg, oklch(77.63% 0.191 130.21), oklch(70.96% 0.218 317.01), oklch(51.60% 0.173 302.32))",
    mesh: "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.3) 0px, transparent 50%), radial-gradient(at 100% 0%, oklch(70.96% 0.218 317.01 / 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, oklch(77.63% 0.191 130.21 / 0.2) 0px, transparent 50%)",
  };

  return (
    <section
      id="features"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(95.95% 0.003 308.43) 0%, oklch(91.30% 0.023 302.50) 100%)",
      }}
    >
      {/* Animated gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.2) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.2) 0px, transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-dust-grey-600 max-w-2xl mx-auto">
            Everything you need to manage your recruitment process efficiently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative p-8 rounded-2xl bg-white border border-dust-grey-200/50 cursor-pointer smooth-transition shadow-md hover:shadow-glow overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 smooth-transition"
                style={{ background: gradientStyles.mesh }}
              />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-glow"
                style={{ background: gradientStyles.accent }}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="relative text-xl font-bold text-dust-grey-900 mb-3 group-hover:text-gradient smooth-transition">
                {feature.title}
              </h3>
              <p className="relative text-dust-grey-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
