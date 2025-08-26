'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const pathname = usePathname();

  // Don't render header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const darkTextPaths = ['/ekibimiz'];
  
  // Check if we're on a team member detail page or project detail page
  const isTeamMemberPage = pathname.startsWith('/ekibimiz/') && pathname !== '/ekibimiz';
  const isProjectDetailPage = pathname.startsWith('/projeler/') && pathname !== '/projeler';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return pathname === path;
  };

  // Determine which logo to show based on scroll state and page type
  const logoSrc = isScrolled || isTeamMemberPage || isProjectDetailPage ? "/img/logo-natron.png" : "/img/logo-natron.png";

  const handleServicesClick = (e) => {
    e.preventDefault();
    setIsServicesModalOpen(true);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src={logoSrc}
                  alt="Natron Logo"
                  width={180}
                  height={50}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="md:flex max-md:hidden items-center space-x-8">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  isActive("/")
                    ? "text-blue-600 font-bold"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : isTeamMemberPage || isProjectDetailPage
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors ${
                  isActive("/about")
                    ? "text-blue-600 font-bold"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : isTeamMemberPage || isProjectDetailPage
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                About Us
              </Link>
             
              <button
                onClick={handleServicesClick}
                className={`font-medium transition-colors ${
                  isActive("/services")
                    ? "text-blue-600 font-bold"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : isTeamMemberPage || isProjectDetailPage
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Services
              </button>
              
              <Link
                href="/contact"
                className={`font-medium transition-colors ${
                  isActive("/contact")
                    ? "text-blue-600 font-bold"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : isTeamMemberPage || isProjectDetailPage
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Contact
              </Link>
              
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className={`${isScrolled ? "text-gray-800" : "text-white"}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`font-medium ${
                    isActive("/") ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`font-medium ${
                    isActive("/about") ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/ekibimiz"
                  className={`font-medium ${
                    isActive("/ekibimiz") ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Team
                </Link>
                <button
                  onClick={() => {
                    setIsServicesModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className={`font-medium text-left ${
                    isActive("/services") ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                >
                  Services
                </button>
                <Link
                  href="/haberler"
                  className={`font-medium ${
                    isActive("/haberler") ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  News
                </Link>
                <Link
                  href="/contact"
                  className={`font-medium ${
                    isActive("/contact") ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
               
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Services Modal */}
      {isServicesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsServicesModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Text */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                Our services will be available here very soon. We are currently in development phase.
              </p>

              {/* Close Button */}
              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 