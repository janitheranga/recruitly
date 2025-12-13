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
  const accentGradient =
    "linear-gradient(135deg, oklch(77.63% 0.191 130.21), oklch(70.96% 0.218 317.01), oklch(51.60% 0.173 302.32))";
  const meshGradient =
    "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.3) 0px, transparent 50%), radial-gradient(at 100% 0%, oklch(70.96% 0.218 317.01 / 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, oklch(77.63% 0.191 130.21 / 0.2) 0px, transparent 50%)";

  return (
    <section
      id="pricing"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(91.30% 0.023 302.50) 0%, oklch(95.95% 0.003 308.43) 100%)",
      }}
    >
      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(70.96% 0.218 317.01 / 0.15) 0px, transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-dust-grey-600 max-w-2xl mx-auto">
            Choose the perfect plan for your team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl cursor-pointer smooth-transition overflow-visible flex flex-col p-2 min-h-130 ${
                plan.highlighted
                  ? "text-white shadow-glow-lg md:scale-105"
                  : "bg-white border border-dust-grey-200/50 shadow-md hover:shadow-glow"
              }`}
              style={
                plan.highlighted ? { background: accentGradient } : undefined
              }
            >
              {plan.highlighted && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-20"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(81.74% 0.163 128.60), oklch(70.96% 0.218 317.01))",
                    color: "white",
                  }}
                >
                  ⭐ Most Popular
                </motion.div>
              )}

              {!plan.highlighted && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 smooth-transition rounded-2xl"
                  style={{ background: meshGradient }}
                />
              )}

              <div
                className={`relative z-10 p-8 flex flex-col h-full ${
                  plan.highlighted ? "pt-12" : ""
                }`}
              >
                <div className="flex-1">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      !plan.highlighted && "text-dust-grey-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mb-6 text-sm ${
                      plan.highlighted ? "text-white/80" : "text-dust-grey-600"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span
                      className={`text-4xl font-bold ${
                        !plan.highlighted && "text-dust-grey-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span
                        className={`text-sm ml-1 ${
                          plan.highlighted
                            ? "text-white/70"
                            : "text-dust-grey-600"
                        }`}
                      >
                        /month
                      </span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className={`h-5 w-5 shrink-0 mt-0.5 ${
                            plan.highlighted
                              ? "text-white"
                              : "text-honeydew-500"
                          }`}
                        />
                        <span
                          className={`text-sm leading-relaxed ${
                            plan.highlighted
                              ? "text-white/90"
                              : "text-dust-grey-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto"
                >
                  <Button
                    className={`w-full cursor-pointer font-semibold ${
                      plan.highlighted
                        ? "bg-(--color-honeydew-500) text-white hover:bg-(--color-honeydew-400) border-2 border-(--color-honeydew-400)"
                        : "bg-(--color-dust-grey-200) hover:bg-(--color-dust-grey-300) text-(--color-dust-grey-900) shadow-md border-2 border-(--color-dust-grey-100) hover:shadow-lg"
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
