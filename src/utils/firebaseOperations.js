import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  Timestamp 
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { db, auth } from "./firebase";

// Authentication operations
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    // Check static credentials from env
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      return { user: { email: adminEmail }, error: null };
    } else {
      return { user: null, error: "Geçersiz kullanıcı adı veya şifre" };
    }
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Contact messages operations
export const saveContactMessage = async (messageData) => {
  try {
    const messagesCollection = collection(db, "contactMessages");
    const docRef = await addDoc(messagesCollection, {
      ...messageData,
      timestamp: Timestamp.fromDate(new Date(messageData.timestamp)),
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { id: null, error: error.message };
  }
};

export const getContactMessages = async () => {
  try {
    console.log("Attempting to fetch messages from Firestore...");
    
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      console.log("Not in browser environment");
      return { messages: [], error: "Not in browser environment" };
    }
    
    // Check admin authentication
    console.log("Admin auth check:", localStorage.getItem("admin_authenticated"));
    
    // Continue with fetching data regardless of auth status for now
    // We'll rely on Firestore rules for actual permission control
    const messagesCollection = collection(db, "contactMessages");
    const q = query(messagesCollection, orderBy("createdAt", "desc"));
    console.log("Query created");
    
    try {
      const querySnapshot = await getDocs(q);
      console.log("Query executed, document count:", querySnapshot.size);
      
      const messages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Document data:", doc.id);
        messages.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate().toISOString() || new Date().toISOString()
        });
      });
      
      console.log("Processed messages:", messages.length);
      return { messages, error: null };
    } catch (firestoreError) {
      console.error("Firestore query error:", firestoreError);
      
      // If we get a permission error, provide mock data for testing
      if (firestoreError.code === "permission-denied") {
        console.log("Permission denied, providing mock data for testing");
        const mockMessages = [
          {
            id: "mock1",
            name: "Test User",
            email: "test@example.com",
            phone: "123456789",
            subject: "Test Subject",
            message: "This is a mock message for testing. You're seeing this because of Firestore permission issues.",
            timestamp: new Date().toISOString(),
            read: false
          }
        ];
        return { messages: mockMessages, error: "Using mock data due to permission issues" };
      }
      
      return { messages: [], error: firestoreError.message };
    }
  } catch (error) {
    console.error("Error getting contact messages:", error);
    return { messages: [], error: error.message };
  }
};

export const getContactMessageById = async (messageId) => {
  try {
    const messageRef = doc(db, "contactMessages", messageId);
    const messageSnap = await getDoc(messageRef);
    
    if (messageSnap.exists()) {
      const data = messageSnap.data();
      return { 
        message: {
          id: messageSnap.id,
          ...data,
          timestamp: data.timestamp?.toDate().toISOString() || new Date().toISOString()
        }, 
        error: null 
      };
    } else {
      return { message: null, error: "Message not found" };
    }
  } catch (error) {
    console.error("Error getting contact message:", error);
    return { message: null, error: error.message };
  }
};

export const markMessageAsRead = async (messageId) => {
  try {
    const messageRef = doc(db, "contactMessages", messageId);
    await updateDoc(messageRef, {
      read: true,
      readAt: Timestamp.now()
    });
    return { success: true, error: null };
  } catch (error) {
    console.error("Error marking message as read:", error);
    return { success: false, error: error.message };
  }
};

export const deleteContactMessage = async (messageId) => {
  try {
    const messageRef = doc(db, "contactMessages", messageId);
    await deleteDoc(messageRef);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return { success: false, error: error.message };
  }
}; 