"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/services/tech-consulting.jpg"
            alt="Natron Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Coming
                <span className="text-blue-400"> Soon</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Our services will be available here very soon
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              We're Working on Something Big
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Our team is developing innovative solutions in AI, Machine Learning, and Computer Technologies.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 