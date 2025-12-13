"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams",
    features: [
      "Up to 50 applicants",
      "Basic analytics",
      "Email support",
      "Candidate database",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$299",
    description: "For growing companies",
    features: [
      "Up to 500 applicants",
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
      "Team collaboration",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited applicants",
      "Custom integration",
      "Dedicated support",
      "API access",
      "Advanced security",
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 sm:py-32 bg-white dark:bg-indigo-velvet-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 dark:text-dust-grey-50 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-dust-grey-600 dark:text-dust-grey-300 max-w-2xl mx-auto">
            Choose the perfect plan for your team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: plan.highlighted ? 1.08 : 1.02 }}
              className={`group relative p-8 rounded-2xl cursor-pointer smooth-transition overflow-hidden ${
                plan.highlighted
                  ? "gradient-accent text-white shadow-glow-lg scale-105 animate-gradient"
                  : "bg-white dark:bg-indigo-velvet-800 border border-dust-grey-200 dark:border-indigo-velvet-700/50 shadow-md hover:shadow-glow"
              }`}
            >
              {plan.highlighted && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-8 px-4 py-1.5 bg-white text-dark-amethyst-600 rounded-full text-sm font-bold shadow-md"
                >
                  ⭐ Most Popular
                </motion.div>
              )}

              {!plan.highlighted && (
                <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-10 smooth-transition" />
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p
                className={`mb-6 ${
                  plan.highlighted
                    ? "text-white/80"
                    : "text-dust-grey-600 dark:text-dust-grey-400"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span
                    className={
                      plan.highlighted
                        ? "text-white/70"
                        : "text-slate-600 dark:text-slate-400"
                    }
                  >
                    /month
                  </span>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className={`w-full cursor-pointer mb-8 ${
                    plan.highlighted
                      ? "bg-white text-dark-amethyst-500 hover:bg-white/90"
                      : "bg-honeydew-500 hover:bg-honeydew-600 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
