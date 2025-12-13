"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    const angle = Math.atan2(y, x) * (180 / Math.PI);
    containerRef.current.style.setProperty("--rotation", `${angle}deg`);
  };

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden bg-white">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-honeydew-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-dark-amethyst-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-accent text-white text-sm font-semibold shadow-glow animate-gradient">
                <motion.span
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚀
                </motion.span>
                Next Generation Recruitment
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-7xl font-bold text-dust-grey-900 leading-tight"
            >
              Find Your Perfect{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Talent</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 gradient-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>{" "}
              with <span className="text-gradient">Recruitly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-dust-grey-600 max-w-2xl leading-relaxed"
            >
              Streamline your hiring process with AI-powered candidate matching,
              real-time analytics, and collaborative tools designed for modern
              teams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="cursor-pointer gradient-primary text-white shadow-glow smooth-transition hover:shadow-glow-lg text-lg px-8 py-6"
                >
                  Get Started Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="cursor-pointer">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Resume Example 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Resume Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(95.95% 0.003 308.43) 0%, oklch(98.0% 0.001 0) 100%)",
                border: "2px solid oklch(91.88% 0.007 304.24)",
              }}
            >
              {/* Gradient accent bars - different colors */}
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(70.96% 0.218 317.01), oklch(51.60% 0.173 302.32))",
                }}
              />

              <div className="p-8 space-y-6">
                {/* Header with Avatar */}
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.05 }}
                    className="relative"
                  >
                    <div
                      className="w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center text-4xl font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(70.96% 0.218 317.01), oklch(51.60% 0.173 302.32))",
                      }}
                    >
                      SM
                    </div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-md"
                      style={{ background: "oklch(70.96% 0.218 317.01)" }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-dust-grey-950 mb-1">
                      Sarah Martinez
                    </h2>
                    <p className="text-base text-dust-grey-600 mb-3">
                      Product Designer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: "oklch(70.96% 0.218 317.01)" }}
                      >
                        Immediate
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dust-grey-100 text-dust-grey-700">
                        8+ Years
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-dust-grey-200">
                  <div className="text-sm">
                    <p className="text-dust-grey-500 mb-1">Email</p>
                    <p className="text-dust-grey-900 font-medium">
                      sarah.m@example.com
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-dust-grey-500 mb-1">Location</p>
                    <p className="text-dust-grey-900 font-medium">
                      New York, NY
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-bold text-dust-grey-950 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Figma",
                      "UI/UX",
                      "Prototyping",
                      "Design Systems",
                      "Research",
                    ].map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, oklch(${
                            91 - i * 2
                          }% 0.007 304.24), oklch(${
                            87 - i * 2
                          }% 0.019 299.96))`,
                          color: "oklch(40.30% 0.022 299.46)",
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-sm font-bold text-dust-grey-950 mb-3">
                    Experience
                  </h3>
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="pl-4 border-l-2"
                      style={{ borderColor: "oklch(70.96% 0.218 317.01)" }}
                    >
                      <p className="text-sm font-semibold text-dust-grey-900">
                        Lead Product Designer
                      </p>
                      <p className="text-xs text-dust-grey-600">
                        DesignHub • 2020 - Present
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="pl-4 border-l-2 border-dust-grey-300"
                    >
                      <p className="text-sm font-semibold text-dust-grey-900">
                        Senior Designer
                      </p>
                      <p className="text-xs text-dust-grey-600">
                        Creative Studio • 2018 - 2020
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-sm font-bold text-dust-grey-950 mb-3">
                    Education
                  </h3>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="pl-4 border-l-2"
                    style={{ borderColor: "oklch(51.60% 0.173 302.32)" }}
                  >
                    <p className="text-sm font-semibold text-dust-grey-900">
                      MA in Design
                    </p>
                    <p className="text-xs text-dust-grey-600">
                      Parsons School of Design • 2014 - 2018
                    </p>
                  </motion.div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(70.96% 0.218 317.01), oklch(51.60% 0.173 302.32))",
                  }}
                >
                  View Full Profile
                </motion.button>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-4 top-8 px-4 py-2 rounded-full shadow-xl text-sm font-bold text-white"
              style={{ background: "oklch(70.96% 0.218 317.01)" }}
            >
              98% Match
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -left-4 bottom-8 px-4 py-2 rounded-full shadow-xl text-sm font-bold"
              style={{
                background: "white",
                color: "oklch(51.60% 0.173 302.32)",
              }}
            >
              Featured
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
