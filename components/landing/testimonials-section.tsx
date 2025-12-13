"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Talent",
    company: "TechVision Inc.",
    image: "/images/people/Sarah_Chen.jpg",
    content:
      "Recruitly has transformed our hiring process. We've reduced time-to-hire by 60% and improved candidate quality significantly. The AI matching is incredibly accurate!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "CEO & Founder",
    company: "StartupHub",
    image: "/images/people/Michael_Rodriguez.jpg",
    content:
      "As a fast-growing startup, we needed a recruitment solution that could scale with us. Recruitly delivered beyond our expectations. Game changer!",
    rating: 4,
  },
  {
    name: "Emily Thompson",
    role: "HR Director",
    company: "Global Solutions Ltd.",
    image: "/images/people/Emily_Thompson.jpg",
    content:
      "The analytics and insights provided by Recruitly have helped us make data-driven hiring decisions. Our team productivity has increased by 45%.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(95.95% 0.003 308.43) 0%, oklch(91.30% 0.023 302.50) 100%)",
      }}
    >
      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.2) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.2) 0px, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block px-4 py-2 rounded-full gradient-secondary text-white text-sm font-semibold mb-4"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-dust-grey-600">
            Real stories from companies that transformed their hiring
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 border border-dust-grey-200 shadow-md hover:shadow-glow smooth-transition"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-10 smooth-transition rounded-2xl" />

              {/* Quote icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="absolute -top-4 -left-4 w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-glow"
              >
                <Quote className="h-6 w-6 text-white" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 relative">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.15 + 0.2 + i * 0.1 }}
                  >
                    <Star
                      className="h-5 w-5"
                      style={{
                        fill: "oklch(81.74% 0.163 128.60)",
                        color: "oklch(81.74% 0.163 128.60)",
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <p className="relative text-dust-grey-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="relative flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gradient-to-br from-honeydew-400 to-dark-amethyst-400 shadow-md"
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div>
                  <h4 className="font-bold text-dust-grey-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-dust-grey-600">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-dust-grey-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="flex items-center gap-2 text-dust-grey-600">
            <div className="gradient-primary rounded-full p-2">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-semibold">ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-dust-grey-600">
            <div className="gradient-primary rounded-full p-2">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-semibold">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-dust-grey-600">
            <div className="gradient-primary rounded-full p-2">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-semibold">SOC 2 Type II</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
