"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const References = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'technology', name: 'Technology' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const achievements = [
    {
      id: 1,
      title: '200+ Projects',
      category: 'technology',
      icon: '🚀',
      description: 'Successfully completed projects across various industries',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: '400+ Clients',
      category: 'ecommerce',
      icon: '👥',
      description: 'Trusted by businesses worldwide',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: '47 Awards',
      category: 'awards',
      icon: '🏆',
      description: 'Interdisciplinary awards',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Successful Software',
      category: 'marketing',
      icon: '🛡️',
      description: 'Worldwide reliable software',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: '94% Loyal',
      category: 'technology',
      icon: '🎯',
      description: 'Our customers who are loyal to our work',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      title: 'National Representation',
      category: 'ecommerce',
      icon: '🌍',
      description: 'SpaceClaim Main Representative',
      color: 'from-indigo-500 to-indigo-600'
    },
  ];

  const filteredAchievements = activeFilter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeFilter);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Specific reasons why natron has made its mark on the world </p>
        </div>

       

        {/* Achievements Grid */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span>{achievement.icon}</span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {achievement.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Story?</h3>
            <p className="text-blue-100 mb-6">
              Let's work together to achieve your business goals and add another success story to our portfolio.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default References; 