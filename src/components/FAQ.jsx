"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Where are our offices and dealers?",
      answer: "Our head office is located in Istanbul Ataşehir, but Natron Software offers services with Global and National digital developments.",
      icon: "🏢",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      question: "How many years has Natron been in operation?",
      answer: "Natron Software was founded in Istanbul in 2008. The company has undergone changes in its operations for various administrative reasons.",
      icon: "⏱️",
      color: "from-green-500 to-blue-600"
    },
    {
      id: 3,
      question: "Are there internship opportunities at NATRON Software?",
      answer: "YES! Natron is open for internships especially for young, dynamic and technology-enthusiastic undergraduate, graduate or professional students.",
      icon: "🎯",
      color: "from-pink-500 to-red-600"
    },
    {
      id: 4,
      question: "Is support/consulting provided to startups?",
      answer: "Of course. Natron offers consulting and various services to startups that shape the future.",
      icon: "⚡",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 5,
      question: "Which Softwares Do We Represent?",
      answer: "We are the Türkiye managers of SpaceClaim, KeyShot, Geomagic Studio, QuadriSpace, EnMesh software.",
      icon: "🛠️",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 6,
      question: "How can I contact you?",
      answer: "You can contact us 24/7 via email, phone, or social media. We are very enthusiastic about this.",
      icon: "💬",
      color: "from-indigo-500 to-blue-600"
    }
  ];

  const currentFaq = faqData.find(faq => faq.id === activeFaq);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answers to questions you're curious about Natron
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Questions Side */}
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.button
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFaq(faq.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeFaq === faq.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${faq.color} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                      <span className="text-2xl">{faq.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          activeFaq === faq.id ? 'bg-blue-500' : 'bg-gray-300'
                        } transition-colors`}>
                          <svg
                            className={`w-4 h-4 text-white transition-transform ${
                              activeFaq === faq.id ? 'rotate-45' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-500">View details</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Answer Display Side */}
            <div className="lg:sticky lg:top-20">
              <motion.div
                key={activeFaq}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {activeFaq ? (
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 shadow-xl border border-gray-100 min-h-[600px]">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r ${currentFaq.color} flex items-center justify-center text-white text-3xl mb-4 shadow-lg`}>
                          {currentFaq.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {currentFaq.question}
                        </h3>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50">
                        <p className="text-gray-700 leading-relaxed text-xl">
                          {currentFaq.answer}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-gray-100">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl mb-6">
                      ❓
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Select a question
                    </h3>
                    <p className="text-gray-600">
                      You can see the detailed answer here by selecting one of the questions on the left.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 