"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialSlider() {
  const references = [
    { name: "Snapper", image: "/img/referances/snapper.png" },
    { name: "Siemens", image: "/img/referances/siemens.png" },
    { name: "Roketsan", image: "/img/referances/roketsan.png" },
    { name: "Nurus", image: "/img/referances/nurus.png" },
    { name: "Migros", image: "/img/referances/migros.png" },
    { name: "Isuzu", image: "/img/referances/isuzu.png" },
    { name: "Aselsan", image: "/img/referances/aselsan.png" },
    { name: "Arcelik", image: "/img/referances/arcelik.png" },
    { name: "Alstom", image: "/img/referances/alstom.png" },
  ];

  // Duplicate the array to create seamless infinite loop
  const duplicatedReferences = [...references, ...references];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">References</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </div>

        {/* Horizontal Scrolling Animation */}
        <div className="flex">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedReferences.map((reference, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-32 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={reference.image}
                  alt={reference.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

       
      </div>
    </section>
  );
} 