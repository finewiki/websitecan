"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("terms");

  const sections = {
    terms: {
      title: "Terms of Use",
      content: [
        {
          title: "1. General Provisions",
          text: "By using this website, you are deemed to have accepted the following terms of use. If you do not accept these terms, please do not use the site. Natron reserves the right to change these terms without prior notice.",
        },
        {
          title: "2. Service Usage",
          text: "When using the services we offer as Natron, you must comply with all legal regulations and ethical rules. Your use of our services may be restricted in cases of misuse, damage to systems, or violation of others' rights.",
        },
        {
          title: "3. Intellectual Property",
          text: "All content on the site is under Natron's intellectual property and cannot be used without permission. Logo, brand, software, design and all other materials are protected by copyright.",
        },
        {
          title: "4. User Responsibilities",
          text: "Users are responsible for the security and privacy of their accounts. It is the users' responsibility to inform Natron when a suspicious situation is detected.",
        },
        {
          title: "5. Service Changes",
          text: "Natron reserves the right to change, update or terminate its services without prior notice. Users will be informed of these changes.",
        },
        {
          title: "6. Liability Limitations",
          text: "Natron does not guarantee that its services will be uninterrupted or error-free. It cannot be held responsible for direct or indirect damages arising from the services.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      content: [
        {
          title: "1. Data Collection",
          text: "Your personal data is collected securely to provide and improve our services. This data may include name-surname, email address, phone number, business information and usage statistics.",
        },
        {
          title: "2. Data Usage",
          text: "Collected data is used in accordance with legal regulations and only for specified purposes. These purposes include service provision, customer support, development work and fulfillment of legal obligations.",
        },
        {
          title: "3. Data Security",
          text: "The latest technological measures are taken for the security of your data. Measures such as SSL encryption, firewalls, regular security updates and access control are implemented.",
        },
        {
          title: "4. Data Sharing",
          text: "Your personal data is not shared with third parties except for legal obligations. Sharing with our service providers is carried out within the scope of data security agreements.",
        },
        {
          title: "5. Data Retention",
          text: "Your data is stored as long as necessary for service provision. When legal retention periods expire or your data is no longer needed, it is securely deleted.",
        },
        {
          title: "6. User Rights",
          text: "Under the scope of KVKK, you have the rights to access, correct, delete and restrict processing of your data. You can contact us to exercise these rights.",
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      content: [
        {
          title: "1. Cookie Usage",
          text: "Cookies used on our site are used to improve user experience, increase site performance and ensure security. Cookies are small text files saved to your device through your browser.",
        },
        {
          title: "2. Cookie Types",
          text: "Essential cookies: Required for basic site functions. Performance cookies: Used to analyze site usage. Functional cookies: Used to remember user preferences. Targeting cookies: Used to provide personalized content.",
        },
        {
          title: "3. Cookie Management",
          text: "You can manage your cookie preferences from your browser settings. However, some site features may not work properly if you disable certain cookies.",
        },
        {
          title: "4. Third Party Cookies",
          text: "Third-party service cookies such as Google Analytics and Facebook Pixel are also used on our site. These cookies are used to analyze site usage and personalize advertising experience.",
        },
        {
          title: "5. Cookie Security",
          text: "The cookies we use are secure and encrypted. Data collected through cookies is protected within the scope of our privacy policy.",
        },
        {
          title: "6. Cookie Preferences",
          text: "On your first visit to our site, you will be informed about cookie usage and will be able to determine your preferences. You can change these preferences later.",
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlfGVufDB8fDB8fHww"
            alt="Terms and Conditions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Natron's terms of use and policies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4">
              <div className="sticky top-32 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contents</h3>
                <nav className="space-y-4">
                  {Object.entries(sections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeSection === key
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {sections[activeSection].title}
                </h2>
                <div className="space-y-8">
                  {sections[activeSection].content.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    
    </main>
  );
} 