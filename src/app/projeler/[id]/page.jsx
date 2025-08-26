"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCode, faPalette, faRocket, faUsers, faGlobe, faMobile, faServer, faDatabase, faCloud } from '@fortawesome/free-solid-svg-icons';
import { notFound } from "next/navigation";

const projects = [
  {
    id: 1,
    title: 'Random Bayim ',
    category: 'ecommerce',
    image: '/img/randombayim1.jpg',
    description: 'E-ticaret platformu',
    fullDescription: 'Oyun tutkunlarının güvenle alışveriş yapabildiği, Türkiye’nin önde gelen dijital oyun platformlarından biridir.Random Bayim üzerinden kullanıcılar; oyun içi epin, dijital ürünler ve oyun hesaplarını kolayca satın alabilir, aynı zamanda kendi hesaplarını satarak gelir elde edebilirler.3-4 yıldır aktif olarak hizmet veren platformumuz; hem satıcılar hem de alıcılar için güvenli ve hızlı ticaret ortamı sunar.Sistemimizin kullanıcı dostu yapısı, güçlü destek altyapısı ve güncel içerikleri sayesinde kısa sürede büyük bir kitleye ulaşmış bulunuyoruz.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
    features: [
      'Oyun İçi Para Satışı',
      'Hesap Satışı',
      'pazar Yeri'
    ],
    gallery: [
      '/img/rbgaleri1.jpg',
      '/img/rb2.jpg',
      '/img/çark-1.jpg',
      '/img/rbgaleri2.jpg'
    ],
    status: 'Tamamlandı',
    duration: '6 Ay',
    team: '5 Kişi',
    budget: 'Orta Seviye',
    size: 'medium'
  },
  {
    id: 2,
    title: 'Spelya Yazılım',
    category: 'ecommerce',
    image: '/img/spelya.jpg',
    description: 'Yazılım platformu',
    fullDescription: 'Modern yazılım çözümleri sunmak için kurulan Spelya Yazılım, profesyonel yazılım ekibimizle birlikte işletmelerin dijital ihtiyaçlarına uçtan uca çözümler sunmaktadır.Web siteleri, mobil uygulamalar, özel yazılım projeleri ve dijital altyapı tasarımı gibi geniş bir hizmet yelpazesinde faaliyet gösteriyoruz.İş ortaklarımıza yalnızca teknik destek değil, aynı zamanda stratejik yazılım danışmanlığı da sağlayarak projelerini başarıya ulaştırmalarına yardımcı oluyoruz.',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    features: [
      'Güvenli ödeme sistemleri',
      'Gelişmiş ürün filtreleme',
      'Kişiselleştirilmiş öneriler',
      'Mobil uyumlu tasarım',
      'Admin paneli',
      'Gizlilik koruması'
    ],
    gallery: [
      '/img/randombayim1.jpg',
      '/img/spokingo.jpg',
      '/img/bayronix12.jpg',
      '/img/parakazan.jpg'
    ],
    status: 'Aktif',
    duration: '5 Ay',
    team: '6 Kişi',
    budget: 'Yüksek Seviye',
    size: 'large'
  },
  {
    id: 3,
    title: 'Spokingo',
    category: 'design',
    image: '/img/spokingo1.jpg',
    description: 'Dekor , Biblo , Hediyelik',
    fullDescription: 'Spokingo, 3D yazıcı teknolojisi ile yenilikçi ve özgün üretim yapan markamızdır.Kendi bünyemizde yer alan 3D yazıcılarımızla çeşitli ürünlerin tasarımı ve üretimini gerçekleştiriyor, hem bireysel hem ticari müşterilere özel çözümler sunuyoruz.Üretim sürecinde kalite ve hassasiyeti ön planda tutuyor, her bir ürünü titizlikle hazırlıyoruz.Spokingo, teknoloji ile üretimi buluşturan bir yaklaşımla fiziksel dünyada da iz bırakmayı hedefliyor.',
    technologies: ['Vue.js', 'Firebase', 'Socket.io', 'AWS'],
    features: [
      'Çiftler için özel hediyeler',
      'Anı paylaşımı',
      'Hediyelik Eşya'
    ],
    gallery: [
      '/img/figur1.jpg',
      '/img/figur2.jpg',
      '/img/figur3.jpg',
      '/img/figur4.jpg'
    ],
    status: 'Tamamlandı',
    duration: '4 Ay',
    team: '6 Kişi',
    budget: 'Orta Seviye',
    size: 'medium'
  },
  {
    id: 4,
    title: 'Fast',
    category: 'technology',
    image: '/img/fast.jpg',
    description: 'Hızlı teslimat uygulaması',
    fullDescription: 'Fast, şehir içi hızlı teslimat hizmeti sunan mobil uygulamadır. GPS takibi, gerçek zamanlı bildirimler ve optimize edilmiş rota planlaması ile müşterilerin siparişlerini en hızlı şekilde teslim eder.',
    technologies: ['React Native', 'Google Maps API', 'Node.js', 'MongoDB'],
    features: [
      'GPS takibi',
      'Gerçek zamanlı bildirimler',
      'Optimize edilmiş rota planlaması',
      'Sürücü değerlendirme sistemi',
      'Çoklu ödeme seçenekleri'
    ],
    gallery: [
      '/img/fast.jpg',
      '/img/slider3.jpg',
      '/img/giriş1.png',
      '/img/slider.png'
    ],
    status: 'Geliştirme Aşamasında',
    duration: '5 Ay',
    team: '10 Kişi',
    budget: 'Yüksek Seviye',
    size: 'small'
  },
  {
    id: 5,
    title: 'Altay',
    category: 'marketing',
    image: '/img/altay.jpeg',
    description: 'Dijital pazarlama ajansı',
    fullDescription: 'Altay, markaların dijital varlığını güçlendiren kapsamlı pazarlama çözümleri sunar. SEO optimizasyonu, sosyal medya yönetimi ve içerik pazarlaması stratejileri ile müşterilerin hedeflerine ulaşmasına yardımcı olur.',
    technologies: ['WordPress', 'Google Analytics', 'Facebook Ads API', 'Mailchimp'],
    features: [
      'SEO optimizasyonu',
      'Sosyal medya yönetimi',
      'İçerik pazarlaması',
      'Google Ads yönetimi',
      'Raporlama ve analiz'
    ],
    gallery: [
      '/img/altay.jpeg',
      '/img/altay1.jpeg',
      '/img/slider.png',
      '/img/slider3.jpg'
    ],
    status: 'Tamamlandı',
    duration: '3 Ay',
    team: '4 Kişi',
    budget: 'Düşük Seviye',
    size: 'medium'
  },
  {
    id: 6,
    title: 'RB',
    category: 'ecommerce',
    image: '/img/rb.png',
    description: 'Online alışveriş platformu',
    fullDescription: 'RB, özellikle belirli sektörlere odaklanmış özel e-ticaret platformudur. Kullanıcı dostu arayüz, hızlı ödeme işlemleri ve güvenilir müşteri hizmetleri ile fark yaratır.',
    technologies: ['Laravel', 'MySQL', 'Vue.js', 'PayPal API'],
    features: [
      'Kullanıcı dostu arayüz',
      'Hızlı ödeme işlemleri',
      'Güvenilir müşteri hizmetleri',
      'Stok yönetimi',
      'Çoklu mağaza desteği'
    ],
    gallery: [
      '/img/rb.png',
      '/img/rb1.jpg',
      '/img/slider3.jpg',
      '/img/giriş.png'
    ],
    status: 'Tamamlandı',
    duration: '7 Ay',
    team: '9 Kişi',
    budget: 'Orta Seviye',
    size: 'small'
  },
];

export default function ProjectDetail({ params }) {
  const { id } = params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id));
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    setLoading(false);
  }, [id]);

  if (!loading && !project) {
    notFound();
  }

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technology':
        return faCode;
      case 'ecommerce':
        return faGlobe;
      case 'design':
        return faPalette;
      case 'marketing':
        return faRocket;
      default:
        return faCode;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800';
      case 'Aktif':
        return 'bg-blue-100 text-blue-800';
      case 'Geliştirme Aşamasında':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors bg-blue-50 px-4 py-2 rounded-full"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-4 h-4" />
          <span>Tüm Projeler</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-lg ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-1.5 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full text-xs font-medium shadow-lg">
                  {project.category === 'technology' && 'Teknoloji'}
                  {project.category === 'ecommerce' && 'E-Ticaret'}
                  {project.category === 'design' && 'Tasarım'}
                  {project.category === 'marketing' && 'Pazarlama'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex flex-col h-full justify-center">
              <div className="mb-2 text-blue-600 font-medium flex items-center">
                <FontAwesomeIcon icon={getCategoryIcon(project.category)} className="mr-2 w-4 h-4" />
                {project.category === 'technology' && 'Teknoloji'}
                {project.category === 'ecommerce' && 'E-Ticaret'}
                {project.category === 'design' && 'Tasarım'}
                {project.category === 'marketing' && 'Pazarlama'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{project.title}</h1>
              <div className="text-xl text-blue-700 font-semibold mb-4">{project.description}</div>
              <div className="w-20 h-1.5 bg-blue-500 rounded-full mb-8"></div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {project.fullDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="flex items-start bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Durum</div>
                    <div className="font-medium">{project.status}</div>
                  </div>
                </div>
                
                <div className="flex items-start bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faCode} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Süre</div>
                    <div className="font-medium">{project.duration}</div>
                  </div>
                </div>
                
                <div className="flex items-start bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Ekip</div>
                    <div className="font-medium">{project.team}</div>
                  </div>
                </div>
                
                <div className="flex items-start bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faServer} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Bütçe</div>
                    <div className="font-medium">{project.budget}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technologies Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Kullanılan Teknolojiler</h2>
            <div className="ml-4 h-1 bg-blue-500 w-20 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="text-blue-600 font-medium">{tech}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Proje Özellikleri</h2>
            <div className="ml-4 h-1 bg-blue-500 w-20 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Proje Galerisi</h2>
            <div className="ml-4 h-1 bg-blue-500 w-20 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <Image
                    src={image}
                    alt={`${project.title} - Görsel ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {project.title} Projesini Yaptırmak İster misiniz?
          </h2>
          <div className="w-20 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Benzer bir proje geliştirmek veya mevcut projenizi geliştirmek için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Diğer Projelerimiz
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 