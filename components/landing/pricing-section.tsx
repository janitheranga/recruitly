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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-3xl cursor-pointer smooth-transition flex flex-col ${
                plan.highlighted
                  ? "text-white shadow-2xl transform scale-105"
                  : "bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl"
              }`}
              style={
                plan.highlighted
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(81.74% 0.163 128.60) 0%, oklch(70.96% 0.218 317.01) 100%)",
                    }
                  : {
                      border: "1px solid oklch(92.88% 0.007 115.71)",
                    }
              }
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold shadow-lg z-20 whitespace-nowrap"
                  style={{
                    background: "oklch(81.74% 0.163 128.60)",
                    color: "white",
                  }}
                >
                  ⭐ Most Popular
                </div>
              )}

              {!plan.highlighted && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 smooth-transition rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(77.63% 0.191 130.21), oklch(70.96% 0.218 317.01))",
                  }}
                />
              )}

              <div
                className={`relative z-10 p-8 flex flex-col ${
                  plan.highlighted ? "pt-12" : "pt-8"
                }`}
              >
                {/* Header */}
                <div className="mb-6">
                  <h3
                    className={`text-2xl font-extrabold mb-2 ${
                      !plan.highlighted && "text-dust-grey-950"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      plan.highlighted ? "text-white/80" : "text-dust-grey-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        !plan.highlighted && "text-dust-grey-950"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span
                        className={`text-sm font-medium ${
                          plan.highlighted
                            ? "text-white/60"
                            : "text-dust-grey-500"
                        }`}
                      >
                        /month
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`h-5 w-5 shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-white" : "text-honeydew-600"
                        }`}
                      />
                      <span
                        className={`text-sm ${
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

                {/* Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.highlighted ? (
                    <Button
                      className="w-full cursor-pointer font-bold text-base py-6 shadow-lg hover:shadow-xl transition-all"
                      style={{
                        background: "white",
                        color: "oklch(77.63% 0.191 130.21)",
                      }}
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      className="w-full cursor-pointer font-bold text-base py-6 transition-all"
                      style={{
                        background: "oklch(22.35% 0.010 116.36)",
                        color: "white",
                      }}
                    >
                      Get Started
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
