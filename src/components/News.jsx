"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const News = () => {
  const newsItems = [
    {
      title: "Yeni Web Teknolojileri Semineri",
      category: "Etkinlik",
      date: "15 Mart 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaCUyMGV2ZW50fGVufDB8fDB8fHww",
      description:
        "En son web teknolojileri ve trendleri hakkında detaylı bir seminer düzenliyoruz.",
      link: "/haberler/yeni-web-teknolojileri-semineri",
    },
    {
      title: "UI/UX Tasarım Workshop'u",
      category: "Workshop",
      date: "20 Mart 2024",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
      description:
        "Kullanıcı deneyimi ve arayüz tasarımı konusunda pratik bir workshop.",
      link: "/haberler/ui-ux-tasarim-workshopu",
    },
    {
      title: "Yeni Ofis Açılışımız",
      category: "Duyuru",
      date: "25 Mart 2024",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlfGVufDB8fDB8fHww",
      description:
        "İstanbul'daki yeni ofisimizin açılışını gerçekleştiriyoruz.",
      link: "/haberler/yeni-ofis-acilisimiz",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Haberler & Duyurular</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En son haberlerimiz, etkinliklerimiz ve duyurularımız hakkında
            bilgi alın.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">{item.date}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <motion.a
                  href={item.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Devamını Oku
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/haberler"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-semibold text-lg"
          >
            Tüm Haberleri Görüntüle
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default News; 