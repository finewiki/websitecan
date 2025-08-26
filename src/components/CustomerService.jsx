"use client";
import { motion } from "framer-motion";
import Link from 'next/link';

const CustomerService = () => {
  const services = [
    {
      id: 1,
      title: "Web Geliştirme",
      description: "Kurumsal ve modern web siteleri, güçlü altyapı ile.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      ),
    },
    {
      id: 2,
      title: "Mobil Uygulama",
      description: "iOS ve Android için yenilikçi mobil uygulamalar.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      ),
    },
    {
      id: 3,
      title: "UI/UX Tasarım",
      description: "Kullanıcı odaklı, modern ve etkileyici arayüzler.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
      ),
    },
    {
      id: 4,
      title: "Dijital Pazarlama",
      description: "SEO, sosyal medya ve içerik stratejileriyle dijital büyüme.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
      ),
    },
  ];

  const steps = [
    { 
      step: "1", 
      title: "Planlama", 
      description: "İhtiyaçları analiz edip detaylı proje planı oluşturuyoruz.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    { 
      step: "2", 
      title: "Çizim", 
      description: "Projenin teknik ve görsel tasarımlarını hazırlıyoruz.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    { 
      step: "3", 
      title: "Uygulama", 
      description: "Projeyi belirlenen standartlarda geliştiriyoruz.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    { 
      step: "4", 
      title: "Destekleme", 
      description: "Sürekli teknik destek ve bakım hizmeti sağlıyoruz.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      step: "5", 
      title: "Sorunları Çözme", 
      description: "Olası sorunları hızlı ve etkili şekilde çözüyoruz.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      step: "6", 
      title: "Teslim", 
      description: "Sistemi sorunsuz ve eksiksiz şekilde teslim ediyoruz.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        
        {/* Process Section */}
        <div className="max-w-6xl mx-auto mt-16 px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-16">Nasıl Çalışırız?</h3>
          
          <div className="relative">
            {/* Bağlantı Çizgisi */}
            <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 hidden md:block"></div>
            
            <div className="space-y-12">
            {steps.map((step, idx) => (
                <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}>
                  {/* İçerik Kutusu */}
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <h4 className={`text-xl font-bold text-gray-900 mb-2 flex items-center gap-3 ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <span className="text-blue-600">{step.step}. Adım</span>
                          <span className="ml-2">{step.title}</span>
                        </div>
                      </h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* İkon Kutusu - Dekoratif */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                      {/* Dekoratif Elementler */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full"></div>
                      
                      {/* Merkezi Adım Numarası */}
                      <div className="relative z-10 text-white text-2xl font-bold">
                        {step.step}
                      </div>
                      
                      {/* Dekoratif Çizgiler */}
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-3 left-3 w-6 h-0.5 bg-white/20 rotate-45"></div>
                        <div className="absolute bottom-3 right-3 w-4 h-0.5 bg-white/15 -rotate-45"></div>
                      </div>
                    </div>
                    {/* Bağlantı Noktası */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-100 rounded-full border-2 border-blue-500 hidden md:block"></div>
                  </div>

                  {/* Boş Div (Grid Dengelemesi için) */}
                  <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerService; 