"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TestimonialSlider from "@/components/TestimonialSlider";

// Component imports
import AboutUs from "@/components/AboutUs";
import WhySpelya from "@/components/WhySpelya";
import News from "@/components/News";
import References from "@/components/References";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      {/* ===== Hero Section - Natron Group Limited Şti ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full scale-105"
          >
            <source src="/159049-818026306_medium.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        </div>

        {/* Hero content */}
        <div className="relative container mx-auto px-4 flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-center flex flex-col items-center justify-center py-24"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              Natron <span className="text-blue-400">Software Limited Şti</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium drop-shadow-sm">
            We are pioneering the industry and building a bright future in Artificial Intelligence, Machine Development, and Computer Technologies.            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
              >
                Get to Know Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== Main Content Sections ===== */}
      
      {/* About Us */}
      <AboutUs />

      {/* References */}
      <References />

      {/* Why Choose Spelya */}
      <WhySpelya />

      <TestimonialSlider />

      {/* Customer Service */}
      
      {/* FAQ */}
      <FAQ />

    

      {/* ===== Contact CTA Section ===== */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Modern Office Space"
            fill
            className="object-cover scale-105 filter brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/85 backdrop-blur-[2px]"></div>
        </div>

        {/* CTA content */}
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready for Collaboration</h2>
            <p className="text-xl text-gray-100 mb-10">
              Natron Group Limited Şti, we are here to take your business to the next level.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/services"
                className="inline-block px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
      </section>
    </main>
  );
} 