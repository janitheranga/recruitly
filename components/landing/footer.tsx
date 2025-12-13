"use client";

import { motion } from "motion/react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Logo } from "../logo";
import Link from "next/link";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "Integrations"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "License", "Cookies"],
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative text-white py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(19.20% 0.047 304.43) 0%, oklch(16.35% 0.034 302.99) 50%, oklch(19.20% 0.047 304.43) 100%)",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.3) 0px, transparent 50%), radial-gradient(at 100% 0%, oklch(70.96% 0.218 317.01 / 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, oklch(77.63% 0.191 130.21 / 0.2) 0px, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <Logo size="sm" showText={true} />
            <p className="text-dust-grey-300 leading-relaxed pt-4">
              Next-generation recruitment platform powered by AI, designed for
              modern, growing teams.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="p-2 bg-indigo-velvet-800 rounded-lg hover:bg-honeydew-500 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((column) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4 text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "var(--color-honeydew-500)" }}
                      className="text-dust-grey-400 hover:text-honeydew-500 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-indigo-velvet-700 pt-8 text-center text-dust-grey-300"
        >
          <p>
            © {currentYear} Recruitly. All rights reserved. Crafted with ❤️ for
            modern teams.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
