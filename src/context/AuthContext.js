import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  
  // Session timeout in milliseconds (15 minutes for admin)
  const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

  // Sign up function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function with session management
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Set session start time for admin
      setSessionStartTime(Date.now());
      // Store session start time in sessionStorage (cleared when browser closes)
      sessionStorage.setItem('adminSessionStart', Date.now().toString());
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear session data
      setSessionStartTime(null);
      sessionStorage.removeItem('adminSessionStart');
      // Sign out from Firebase
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  // Check if session is valid
  const isSessionValid = () => {
    const sessionStart = sessionStorage.getItem('adminSessionStart');
    if (!sessionStart) return false;
    
    const startTime = parseInt(sessionStart);
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    
    return elapsed < SESSION_TIMEOUT;
  };

  // Force logout on session timeout
  const checkSessionTimeout = () => {
    if (currentUser && !isSessionValid()) {
      console.log('Admin session expired, logging out...');
      logout();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if session is still valid
        if (isSessionValid()) {
          setCurrentUser(user);
          const sessionStart = sessionStorage.getItem('adminSessionStart');
          setSessionStartTime(parseInt(sessionStart));
        } else {
          // Session expired or invalid, force logout
          console.log('Invalid or expired session detected, logging out...');
          signOut(auth);
          setCurrentUser(null);
          setSessionStartTime(null);
          sessionStorage.removeItem('adminSessionStart');
        }
      } else {
        setCurrentUser(null);
        setSessionStartTime(null);
        sessionStorage.removeItem('adminSessionStart');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Check session timeout every minute
  useEffect(() => {
    const interval = setInterval(checkSessionTimeout, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentUser]);

  // Clear any existing session on app start
  useEffect(() => {
    // Force logout on app startup for security
    const clearSessionOnStartup = async () => {
      try {
        await signOut(auth);
        sessionStorage.removeItem('adminSessionStart');
        setCurrentUser(null);
        setSessionStartTime(null);
      } catch (error) {
        console.log('No existing session to clear');
      }
    };
    
    clearSessionOnStartup();
  }, []); // Run only once on app startup

  const value = {
    currentUser,
    login,
    signup,
    logout,
    sessionStartTime,
    isSessionValid
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
