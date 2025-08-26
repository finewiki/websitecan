"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// Firebase imports
import { loginWithEmailAndPassword, getContactMessages, deleteContactMessage, markMessageAsRead } from "@/utils/firebaseOperations";

export default function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("messages"); // Default active section
  const router = useRouter();

  // Firebase authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", loginForm.email);
      const { user, error } = await loginWithEmailAndPassword(loginForm.email, loginForm.password);
      
      if (error) {
        console.error("Login failed:", error);
        setError("Giriş başarısız: " + error);
        return;
      }
      
      if (user) {
        console.log("Login successful, user:", user.email);
        setIsAuthenticated(true);
        localStorage.setItem("admin_authenticated", "true");
        fetchMessages(); // Immediately fetch messages after login
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Giriş sırasında bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setMessages([]);
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const fetchMessages = async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        console.log("Fetching messages from Firestore...");
        const { messages, error } = await getContactMessages();
        
        if (error) {
          console.error("Error fetching messages:", error);
          alert("Mesajlar yüklenirken hata oluştu: " + error);
          return;
        }
        
        console.log("Fetched messages:", messages);
        console.log("Messages type:", typeof messages, Array.isArray(messages));
        
        if (messages && Array.isArray(messages)) {
          console.log("Setting messages state with", messages.length, "items");
          setMessages(messages);
          
          if (messages.length === 0) {
            console.log("No messages found in Firestore");
            alert("Firestore'da hiç mesaj bulunamadı.");
          }
        } else {
          console.error("Invalid messages format:", messages);
          alert("Mesajlar geçersiz formatta.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        alert("Mesajlar yüklenirken bir hata oluştu: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("Admin page loaded, checking auth status");
    // Check if user is already authenticated
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    console.log("Is authenticated from localStorage:", isAuth);
    setIsAuthenticated(isAuth);

    if (isAuth) {
      console.log("User is authenticated, fetching messages");
      // Fetch messages with a slight delay to ensure authentication state is set
      setTimeout(() => {
        fetchMessages();
      }, 100);
    } else {
      console.log("User is not authenticated");
      setIsLoading(false);
    }
  }, []);
  
  // Refetch messages when activeSection changes to messages
  useEffect(() => {
    if (isAuthenticated && activeSection === "messages") {
      console.log("Messages section activated, fetching messages");
      fetchMessages();
    }
  }, [activeSection, isAuthenticated]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const markAsRead = async (id) => {
    // Update local state
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
    
    try {
      const { success, error } = await markMessageAsRead(id);
      
      if (error) {
        console.error("Error marking message as read:", error);
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const { success, error } = await deleteContactMessage(id);
      
      if (error) {
        console.error("Error deleting message:", error);
        return;
      }
      
      // Update local state only if delete was successful
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Dashboard menu items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) },
    { id: "messages", label: "İletişim Mesajları", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) },
    { id: "settings", label: "Ayarlar", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) }
  ];

  // Count of unread messages
  const unreadCount = messages.filter(msg => !msg.read).length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Image
                src="/img/logo-natron.png"
                alt="Natron Logo"
                width={200}
                height={60}
                className="h-16 w-auto object-contain mx-auto"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Yönetici Girişi</h2>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        className="w-full pl-10 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="admin@natron.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className="w-full pl-10 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-1px] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          <span>Giriş Yapılıyor...</span>
                        </div>
                      ) : (
                        'Giriş Yap'
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                <p className="text-xs text-center text-gray-500">
                  © {new Date().getFullYear()} Natron Group Limited Şti
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Toplam Mesaj</p>
                      <p className="text-2xl font-bold text-gray-800">{messages.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Okunmamış Mesaj</p>
                      <p className="text-2xl font-bold text-gray-800">{unreadCount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-500 text-white mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Okunmuş Mesaj</p>
                      <p className="text-2xl font-bold text-gray-800">{messages.length - unreadCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Son Mesajlar</h3>
                {messages.slice(0, 5).map((message) => (
                  <div key={message.id} className="border-b border-gray-200 py-3">
                    <Link href={`/admin/message/${message.id}`} className="block hover:bg-gray-50 p-2 rounded">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-800">{message.name}</p>
                        <span className="text-sm text-gray-500">{formatDate(message.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                    </Link>
                  </div>
                ))}
                {messages.length > 5 && (
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => setActiveSection("messages")}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Tüm mesajları görüntüle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">İletişim Formu Mesajları</h2>
                <button
                  onClick={() => fetchMessages()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Mesajları Yenile
                </button>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Henüz mesaj bulunmamaktadır.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İsim
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          E-posta
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Konu
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {messages.map((message) => (
                        <tr key={message.id} className={!message.read ? "bg-blue-50" : ""}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {!message.read ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Yeni
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Okundu
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{message.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{message.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link href={`/admin/message/${message.id}`} className="text-sm text-gray-900 hover:text-blue-600">
                              {message.subject}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(message.timestamp)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => markAsRead(message.id)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              disabled={message.read}
                            >
                              {message.read ? "Okundu" : "Okundu İşaretle"}
                            </button>
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Sil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ayarlar</h2>
              <p className="text-gray-600">Ayarlar sayfası yapım aşamasındadır.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header with logo and user info */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/img/logo-natron.png"
              alt="Natron Logo"
              width={150}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-800 ml-4 hidden md:block">Yönetici Paneli</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="text-sm text-gray-500">Hoş geldiniz,</div>
              <div className="font-medium text-gray-800">Admin</div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center gap-2 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Çıkış</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-lg p-4 md:sticky md:top-32 md:self-start">
            <div className="mb-6 md:hidden">
              <h1 className="text-xl font-bold text-gray-800">Yönetici Paneli</h1>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 shadow-sm transform scale-[1.02]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`mr-3 transition-colors duration-200 ${activeSection === item.id ? "text-blue-600" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {item.id === "messages" && unreadCount > 0 && (
                    <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Quick Stats for Mobile */}
            <div className="mt-8 md:hidden">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">Toplam</div>
                  <div className="font-bold text-blue-700">{messages.length}</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">Yeni</div>
                  <div className="font-bold text-yellow-700">{unreadCount}</div>
                </div>
                <div className="bg-green-50 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">Okunmuş</div>
                  <div className="font-bold text-green-700">{messages.length - unreadCount}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="transition-all duration-300 transform">
              {isLoading ? (
                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                  <p className="text-gray-500 font-medium">Yükleniyor...</p>
                </div>
              ) : (
                renderContent()
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 