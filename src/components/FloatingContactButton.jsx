"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faTimes,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const contactOptions = [
    { 
      name: "Call", 
      icon: faPhone, 
      href: "tel:+905541418852",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 hover:bg-emerald-100"
    },
    { 
      name: "WhatsApp", 
      icon: faWhatsapp, 
      href: "https://wa.me/905541418852",
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    { 
      name: "Instagram", 
      icon: faInstagram, 
      href: "https://www.instagram.com/natron_com",
      color: "text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100"
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-20 right-0 bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-3 min-w-[200px]"
          >
            {/* Contact Options */}
            <div className="space-y-2">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link 
                    href={option.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`w-full p-3 rounded-lg ${option.bgColor} ${option.color} transition-all duration-200 flex items-center gap-3 group hover:shadow-sm`}
                    >
                      <FontAwesomeIcon icon={option.icon} className="text-lg" />
                      <span className="font-medium text-sm">{option.name}</span>
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Simple Arrow */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl focus:outline-none transition-all duration-200 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 45 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faCommentDots} />
      </motion.button>
    </div>
  );
};

export default FloatingContactButton; 