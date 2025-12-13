"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Chen",
    role: "HR Director",
    company: "TechCorp",
    content:
      "Recruitly has transformed our hiring process. We've cut our time-to-hire by 40%!",
    rating: 5,
    image: "SC",
  },
  {
    name: "Michael Johnson",
    role: "Founder",
    company: "StartupHub",
    content: "The best recruitment tool we've ever used. Highly recommended!",
    rating: 5,
    image: "MJ",
  },
  {
    name: "Emma Williams",
    role: "Talent Manager",
    company: "InnovateLabs",
    content: "Great features and excellent support. Worth every penny.",
    rating: 5,
    image: "EW",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 dark:text-dust-grey-50 mb-4">
            Loved by Our Customers
          </h2>
          <p className="text-lg text-dust-grey-600 dark:text-dust-grey-300">
            See what our users are saying
          </p>
        </motion.div>

        <div className="space-y-8">
          {reviews.map((review, rowIndex) => (
            <div key={rowIndex} className="relative overflow-hidden h-32">
              <motion.div
                animate={{ x: rowIndex % 2 === 0 ? [0, -1200] : [0, 1200] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                whileHover={{ animationPlayState: "paused" }}
                className="flex gap-8"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="shrink-0 w-96 p-6 rounded-xl bg-white dark:bg-indigo-velvet-800 border border-honeydew-200/50 dark:border-indigo-velvet-700/50"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-5 w-5 fill-honeydew-500 text-honeydew-500"
                        />
                      ))}
                    </div>
                    <p className="text-dust-grey-700 dark:text-dust-grey-300 mb-4">
                      "{review.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-honeydew-400 to-dark-amethyst-400 flex items-center justify-center text-white font-bold text-sm">
                        {review.image}
                      </div>
                      <div>
                        <p className="font-semibold text-dust-grey-900 dark:text-white">
                          {review.name}
                        </p>
                        <p className="text-sm text-dust-grey-600 dark:text-dust-grey-400">
                          {review.role} @ {review.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
