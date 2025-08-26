"use client";

import { motion } from "framer-motion";

const WhySpelya = () => {
  // Natron advantages
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" /></svg>
      ),
      title: "Multi-Sector",
      description: "A broad ecosystem with strong group companies operating in different sectors.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6a2 2 0 012-2h12a2 2 0 012 2v8c0 2.21-3.582 4-8 4z" /></svg>
      ),
      title: "Strong Ecosystem",
      description: "Sustainable growth and innovation through partnerships and synergy.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
      ),
      title: "Innovative Vision",
      description: "Modern and innovative management approach that shapes the future.",
    },
  ];

 

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 w-full">
      <div className="container w-full mx-auto ">
        {/* Why Natron? */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Natron?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          We are the choice of strong companies with reliable projects and the right innovations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center hover:shadow-2xl transition-all">
              <div className="mb-6 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>


        

      </div>
    </section>
  );
};

export default WhySpelya; 