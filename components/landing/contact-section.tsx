"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(19.20% 0.047 304.43) 0%, oklch(16.35% 0.034 302.99) 100%)",
      }}
    >
      {/* Light mode fallback background */}
      <div
        className="absolute inset-0 block dark:hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(98.0% 0.001 0) 0%, oklch(95.95% 0.003 308.43) 100%)",
        }}
      />
      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-15"
        style={{
          background:
            "radial-gradient(at 0% 0%, oklch(77.63% 0.191 130.21 / 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, oklch(51.60% 0.173 302.32 / 0.15) 0px, transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-dust-grey-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-dust-grey-600 dark:text-dust-grey-300">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@recruitly.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "123 Tech Street, San Francisco, CA",
                },
              ].map((contact) => (
                <motion.div
                  key={contact.label}
                  whileHover={{ x: 10 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-honeydew-100 dark:bg-indigo-velvet-800/50 flex items-center justify-center shrink-0">
                    <contact.icon className="h-6 w-6 text-honeydew-500 dark:text-honeydew-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-dust-grey-900 dark:text-white">
                      {contact.label}
                    </p>
                    <p className="text-dust-grey-600 dark:text-dust-grey-400">
                      {contact.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-white dark:bg-indigo-velvet-800 border border-dust-grey-200 dark:border-indigo-velvet-700/50 space-y-6 shadow-sm"
          >
            <div>
              <label className="block text-sm font-semibold text-dust-grey-900 dark:text-white mb-2">
                Name
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dust-grey-900 dark:text-white mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dust-grey-900 dark:text-white mb-2">
                Message
              </label>
              <Textarea
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full"
                rows={5}
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full cursor-pointer bg-honeydew-500 hover:bg-honeydew-600 text-slate-900 font-semibold"
              >
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
