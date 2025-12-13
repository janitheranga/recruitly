"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Sarah Chen",
    role: "HR Director",
    company: "TechCorp",
    content:
      "Recruitly has transformed our hiring process. We've cut our time-to-hire by 40%!",
    rating: 5,
    image: "/images/people/Sarah_Chen.jpg",
  },
  {
    name: "Michael Rodriguez",
    role: "Founder",
    company: "StartupHub",
    content: "The best recruitment tool we've ever used. Highly recommended!",
    rating: 4,
    image: "/images/people/Michael_Rodriguez.jpg",
  },
  {
    name: "Emily Thompson",
    role: "Talent Manager",
    company: "InnovateLabs",
    content: "Great features and excellent support. Worth every penny.",
    rating: 5,
    image: "/images/people/Emily_Thompson.jpg",
  },
  {
    name: "James Wilson",
    role: "CTO",
    company: "NextGen Solutions",
    content:
      "Recruitly's AI matching has significantly improved our candidate quality.",
    rating: 5,
    image: "/images/people/James_Wilson.jpg",
  },
  {
    name: "Lisa Anderson",
    role: "HR Specialist",
    company: "GlobalTech",
    content:
      "User-friendly interface and powerful features. Our hiring process is smoother than ever.",
    rating: 4,
    image: "/images/people/Lisa_Anderson.jpg",
  },
  {
    name: "Robert Brown",
    role: "CEO",
    company: "Enterprise Solutions",
    content:
      "Recruitly has been a game-changer for our recruitment strategy. The analytics are top-notch.",
    rating: 5,
    image: "/images/people/Robert_Brown.jpg",
  },
  {
    name: "Sophia Martinez",
    role: "HR Director",
    company: "TechWave",
    content:
      "The automation features have saved us countless hours. Highly efficient tool!",
    rating: 4,
    image: "/images/people/Sophia_Martinez.jpg",
  },
  {
    name: "David Lee",
    role: "Talent Acquisition Lead",
    company: "Innovatech",
    content:
      "Recruitly's candidate tracking is seamless. Our team collaboration has improved significantly.",
    rating: 5,
    image: "/images/people/David_Lee.jpg",
  },
  {
    name: "Olivia Garcia",
    role: "HR Manager",
    company: "FutureWorks",
    content:
      "The AI-driven insights have helped us make better hiring decisions. A must-have tool!",
    rating: 5,
    image: "/images/people/Olivia_Garcia.jpg",
  },
  {
    name: "William Johnson",
    role: "Recruitment Specialist",
    company: "TalentPros",
    content:
      "Recruitly has streamlined our recruitment process. The candidate experience has never been better.",
    rating: 4,
    image: "/images/people/William_Johnson.jpg",
  },
];

export function ReviewsSection() {
  const avatarGradient =
    "linear-gradient(135deg, oklch(81.74% 0.163 128.60), oklch(64.01% 0.270 315.85))";

  return (
    <section
      id="reviews"
      className="py-20 sm:py-32 overflow-hidden relative"
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
            "radial-gradient(at 0% 100%, oklch(70.96% 0.218 317.01 / 0.2) 0px, transparent 50%), radial-gradient(at 100% 0%, oklch(51.60% 0.173 302.32 / 0.2) 0px, transparent 50%)",
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
            Loved by Our Customers
          </h2>
          <p className="text-lg text-dust-grey-600">
            See what our users are saying
          </p>
        </motion.div>

        <div className="relative overflow-hidden py-2">
          <motion.div
            animate={{ x: [0, -3000] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
            className="flex gap-6 w-max"
          >
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={index}
                className="shrink-0 w-96 p-6 rounded-xl bg-white border border-honeydew-200/50/50 shadow-md hover:shadow-glow smooth-transition"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-5 w-5"
                      style={{
                        fill: "oklch(81.74% 0.163 128.60)",
                        color: "oklch(81.74% 0.163 128.60)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-dust-grey-700 mb-4 line-clamp-3">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-dust-grey-200">
                  <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={150}
                      height={150}
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-dust-grey-900 truncate">
                      {review.name}
                    </p>
                    <p className="text-xs text-dust-grey-600 truncate">
                      {review.role} @ {review.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
