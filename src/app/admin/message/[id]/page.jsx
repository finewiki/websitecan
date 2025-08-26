"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Firebase imports
import { getContactMessageById, markMessageAsRead, deleteContactMessage } from "@/utils/firebaseOperations";

export default function MessageDetailPage() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isAuth);

    if (!isAuth) {
      router.push("/admin");
      return;
    }

    const fetchMessageDetails = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching message details for ID:", id);
        
        const { message: messageData, error } = await getContactMessageById(id);
        
        if (error) {
          console.error("Error fetching message details:", error);
          setIsLoading(false);
          return;
        }
        
        if (messageData) {
          console.log("Message details fetched:", messageData);
          setMessage(messageData);
          
          // Mark as read if not already read
          if (!messageData.read) {
            console.log("Marking message as read");
            const { success, error } = await markMessageAsRead(id);
            
            if (error) {
              console.error("Error marking message as read:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error in fetchMessageDetails:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessageDetails();
  }, [id, router]);

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

  const handleDelete = async () => {
    if (confirm("Bu mesajı silmek istediğinizden emin misiniz?")) {
      try {
        setIsLoading(true);
        const { success, error } = await deleteContactMessage(id);
        
        if (error) {
          console.error("Error deleting message:", error);
          alert("Mesaj silinirken bir hata oluştu: " + error);
          setIsLoading(false);
          return;
        }
        
        // Redirect back to admin page after successful deletion
        router.push("/admin");
      } catch (error) {
        console.error("Error in handleDelete:", error);
        alert("Mesaj silinirken bir hata oluştu");
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-gray-50 py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/admin"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Mesaj Listesine Dön
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : message ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">{message.subject}</h1>
                  <span className="text-sm text-gray-500">{formatDate(message.timestamp)}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Gönderen:</span>
                      <p className="text-gray-800 font-medium">{message.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">E-posta:</span>
                      <p className="text-gray-800">
                        <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                          {message.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Telefon:</span>
                      <p className="text-gray-800">
                        <a href={`tel:${message.phone}`} className="text-blue-600 hover:underline">
                          {message.phone}
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Durum:</span>
                      <p>
                        {message.read ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Okundu
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Okunmadı
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-3">Mesaj İçeriği</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{message.message}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <a
                    href={`mailto:${message.email}?subject=RE: ${message.subject}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Yanıtla
                  </a>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Mesajı Sil
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-2">Mesaj Bulunamadı</h2>
                <p className="text-gray-600 mb-4">İstediğiniz mesaj bulunamadı veya silinmiş olabilir.</p>
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Mesaj Listesine Dön
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 