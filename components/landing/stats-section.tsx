"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Users, Briefcase, Target, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Users",
    color: "from-honeydew-400 to-honeydew-600",
  },
  {
    icon: Briefcase,
    value: 25000,
    suffix: "+",
    label: "Jobs Posted",
    color: "from-dark-amethyst-400 to-dark-amethyst-600",
  },
  {
    icon: Target,
    value: 95,
    suffix: "%",
    label: "Success Rate",
    color: "from-indigo-velvet-400 to-indigo-velvet-600",
  },
  {
    icon: TrendingUp,
    value: 40,
    suffix: "%",
    label: "Faster Hiring",
    color: "from-honeydew-500 to-dark-amethyst-500",
  },
];

function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  const gradientMap = {
    "from-honeydew-400 to-honeydew-600":
      "linear-gradient(135deg, oklch(81.74% 0.163 128.60), oklch(65.83% 0.160 130.08))",
    "from-dark-amethyst-400 to-dark-amethyst-600":
      "linear-gradient(135deg, oklch(64.01% 0.270 315.85), oklch(50.62% 0.247 313.83))",
    "from-indigo-velvet-400 to-indigo-velvet-600":
      "linear-gradient(135deg, oklch(61.12% 0.138 304.15), oklch(44.11% 0.144 302.38))",
    "from-honeydew-500 to-dark-amethyst-500":
      "linear-gradient(135deg, oklch(77.63% 0.191 130.21), oklch(59.66% 0.293 313.57))",
  };

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(95.95% 0.003 308.43) 0%, white 50%, oklch(95.95% 0.003 308.43) 100%)",
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-honeydew-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-dark-amethyst-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-dust-grey-600">
            Join thousands of companies revolutionizing their hiring process
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white rounded-2xl p-8 border border-dust-grey-200 shadow-md hover:shadow-glow smooth-transition"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-20 smooth-transition rounded-2xl" />

              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                style={{
                  background:
                    gradientMap[stat.color as keyof typeof gradientMap],
                }}
              >
                <stat.icon className="h-7 w-7 text-white" />
              </motion.div>

              <div className="relative">
                <div className="text-4xl font-bold text-dust-grey-900 mb-2">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-sm text-dust-grey-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
